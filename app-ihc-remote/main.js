document.addEventListener('DOMContentLoaded', function () {
    const ultimaOrdenElement = document.getElementById('ultimaOrden');
    const ordenTextoElement = document.getElementById('ordenTexto');
    let ultimoId = null; // Variable para almacenar el ID de la última orden recibida

    function ejecutarOrden(orden) {
        switch (orden) {
            case 'tamaño 3':
                controltexto.classList.add("h1");
                controltexto.style.color = "red";
                console.log("Se encontró la palabra 'tamaño 3'.");
                break;
            case 'abre una pestaña':
                // Abre una nueva pestaña en el navegador
                window.open('https://www.google.com/', '_blank');
                console.log("Se detectó 'abre una pestaña'.");
                break;
            case 'abre youtube':
                // Abre la página en una nueva pestaña
                window.open('https://www.youtube.com/', '_blank');
                console.log("Se detectó 'abre youtube'.");
                break;
            case 'modificar ventana':
                window.resizeTo(800, 600); // Modifica el tamaño de la ventana del navegador
                console.log("Se detectó 'modificar ventana'.");
                break;
            case 'cerrar pestaña':
                // Abre una nueva pestaña y cierra la actual
                window.open('about:blank', '_self').close();
                console.log("Se detectó 'cerrar pestaña'.");
                break;
            case 'cerrar navegador':
                window.close(); // Cierra el navegador
                console.log("Se detectó 'cerrar navegador'.");
                break;
            // Agrega más casos según sea necesario
            case 'abre la pagina del tec':
                window.open('https://itp.itpachuca.edu.mx/', '_blank');
                console.log("Se detectó 'abre la pagina del tec'.");
                break;
            case 'abre mis playlist':
                window.open('https://www.youtube.com/feed/playlists', '_blank');
                console.log("Se detectó 'abre mis playlist'.");
                break;
        }
    }

    function obtenerUltimaOrden() {
        const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/RecVoz';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                return response.json();
            })
            .then(data => {
                // Verificar si hay datos y tomar el último elemento
                if (data && data.length > 0) {
                    const ultimaOrden = data[data.length - 1]; // Obtener la última orden
                    // Comprobar si hay un nuevo ID de frase para actualizar
                    if (ultimoId !== ultimaOrden.id) {
                        ultimoId = ultimaOrden.id;
                        // Ejecutar la orden detectada
                        ejecutarOrden(ultimaOrden.orden);
                    }
                } else {
                    // Si no hay datos, o el array está vacío, mostrar un mensaje
                    console.error("No se recibieron datos válidos.");
                    ordenTextoElement.textContent = "No se encontró la última orden.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function actualizarUltimaOrden() {
        obtenerUltimaOrden();
        setInterval(obtenerUltimaOrden, 2000);
    }

    actualizarUltimaOrden();
});


