const controltexto = document.getElementById('controltexto');

document.addEventListener('DOMContentLoaded', function () {
    const listeningText = document.getElementById('listeningText');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true; // Permitir reconocimiento continuo
    let recognitionActive = false; // Variable para controlar si el reconocimiento está activo
    let timeoutID = null; // ID del temporizador para detener la escucha
    let activationWord = 'vic'; // Palabra de activación

    recognition.onstart = function () {
        listeningText.innerHTML = 'Escuchando...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase(); // Convertir a minúsculas para facilitar la comparación

        // Si se detecta la palabra de activación, se activa el reconocimiento de órdenes
        if (transcript.includes(activationWord)) {
            recognitionActive = true;
            return;
        }

        if (!recognitionActive) {
            return; // Si el reconocimiento no está activo, no se procesa la transcripción
        }

        const keywords = ['tamaño 3', 'abre una pestaña', 'llevame a youtube', 'modificar ventana', 'cerrar una pestaña', 'cerrar navegador']; // Array de palabras clave

        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;

        let ordenDetectada = '';

        // Verificar si alguna palabra clave está presente en la transcripción
        for (let i = 0; i < keywords.length; i++) {
            if (transcript.includes(keywords[i])) {
                ordenDetectada = keywords[i];
                switch (keywords[i]) {
                    case 'tamaño 3':
                        controltexto.classList.add("fs-1");
                        controltexto.style.color = "red";
                        console.log("Se encontró la palabra 'tamaño 3'.");
                        break;
                    case 'abre una pestaña':
                        // Abre una nueva pestaña en el navegador
                        window.open('https://www.google.com/', '_blank');
                        console.log("Se detectó 'abre una pestaña'.");
                        break;
                    case 'llevame a youtube':
                        // Abre la página en una nueva pestaña
                        window.open('https://www.youtube.com/', '_blank');
                        console.log("Se detectó 'llévame a youtube'.");
                        break;
                    case 'modificar ventana':
                        window.resizeTo(800, 600); // Modifica el tamaño de la ventana del navegador
                        console.log("Se detectó 'modificar ventana'.");
                        break;
                    case 'cerrar una pestaña':
                        // Abre una nueva pestaña y cierra la actual
                        window.open('about:blank', '_self').close();
                        console.log("Se detectó 'cerrar una pestaña'.");
                        break;
                    case 'cerrar navegador':
                        window.close(); // Cierra el navegador
                        console.log("Se detectó 'cerrar navegador'.");
                        break;
                    // Agrega más casos según sea necesario
                }
            }
        }

        // Envía la orden detectada a la base de datos MockAPI junto con la fecha y hora actual
        if (ordenDetectada !== '') {
            const fechaHoraActual = obtenerFechaHoraActual();
            enviarDatosAFirebase(ordenDetectada, fechaHoraActual);
            // Borra el resultado después de 10 segundos
            setTimeout(() => {
                resultDiv.innerHTML = '';
            }, 10000);
            // Desactiva el reconocimiento después de procesar una orden
            recognitionActive = false;
        }

        // Reinicia el temporizador para detener la escucha
        reiniciarTemporizador();
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
        // Si el reconocimiento está activo, reinicia la escucha
        if (recognitionActive) {
            recognition.start();
        }
    };

    // Función para obtener la fecha y hora actual en formato YYYY-MM-DD HH:MM:SS
    function obtenerFechaHoraActual() {
        const ahora = new Date();
        const fecha = ahora.toISOString().slice(0, 10); // Obtener la fecha en formato YYYY-MM-DD
        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        const segundos = ahora.getSeconds().toString().padStart(2, '0');
        return `${fecha} ${horas}:${minutos}:${segundos}`;
    }

    // Función para enviar los datos a la base de datos MockAPI
    function enviarDatosAFirebase(orden, fechaHora) {
        // Datos que deseas enviar a la base de datos
        const data = {
            orden: orden,
            fechaHora: fechaHora
        };

        // Opciones para la solicitud fetch
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // URL de tu API de MockAPI
        const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/RecVoz';

        // Realizar la solicitud fetch para enviar los datos a la API
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('La orden se envió correctamente:', data);
                // Realizar cualquier otra acción que necesites después de enviar los datos
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para reiniciar el temporizador para detener la escucha
    function reiniciarTemporizador() {
        // Si hay un temporizador en curso, se cancela
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        // Inicia un nuevo temporizador para detener la escucha después de 5 segundos de inactividad
        timeoutID = setTimeout(() => {
            recognition.stop();
            listeningText.innerHTML = 'Esperando...';
            recognitionActive = false;
        }, 5000);
    }

    // Inicia el reconocimiento de voz automáticamente al cargar la página
    recognition.start();
    recognitionActive = true;
    listeningText.innerHTML = 'Escuchando...';
});
















