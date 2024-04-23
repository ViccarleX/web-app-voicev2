document.addEventListener('DOMContentLoaded', function () {
    const ultimaOrdenElement = document.getElementById('ultimaOrden');
    const ordenTextoElement = document.getElementById('ordenTexto');
    let ultimoId = null; // Variable para almacenar el ID de la última orden recibida

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
                        // Actualizar el contenido de la página con la nueva frase
                        
                        ordenTextoElement.textContent = ultimaOrden.orden;
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
