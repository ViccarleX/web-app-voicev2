function obtenerDatosAFirebase() {
    // URL de tu API de MockAPI
    const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/RecVoz';

    // Realizar la solicitud fetch para obtener los datos de la API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            // Aquí, 'data' ya es un arreglo JavaScript
            console.log('Datos obtenidos:', data.length -1).instruccion;
            // Realizar cualquier otra acción que necesites después de obtener los datos
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

obtenerDatosAFirebase();

document.addEventListener('DOMContentLoaded', function () {
    const ultimaOrdenElement = document.getElementById('ultimaOrden');

    // Función para obtener y mostrar la última orden desde la API
    function obtenerUltimaOrden() {
        // URL de tu API de MockAPI
        const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/RecVoz';

        // Realizar la solicitud fetch para obtener los datos de la API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                return response.json();
            })
            .then(data => {
                // Obtener la última orden y mostrarla en el elemento HTML
                const ultimaOrden = data[data.length - 1].instruccion;
                ultimaOrdenElement.textContent = ultimaOrden;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para actualizar la última orden cada 2 segundos
    function actualizarUltimaOrden() {
        obtenerUltimaOrden(); // Obtener y mostrar la última orden inmediatamente
        setInterval(obtenerUltimaOrden, 2000); // Actualizar cada 2 segundos
    }

    actualizarUltimaOrden(); // Iniciar la actualización de la última orden
});
