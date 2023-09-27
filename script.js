// Definición de la URL de la API
const DATA_URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/';

// Variable para almacenar los datos de la API
let lista = [];

// Función para cargar datos desde la API
function traerDatos() {
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos de la API en la variable 'lista'
            lista = data;
            // Llamar a la función para crear la tabla con los datos
            hacerTable(data);
        })
}

// Función para editar un elemento en la API
function editar(id, data) {
    fetch(`${DATA_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al editar el elemento.');
        }
    })
    .then(() => {
        // Después de editar, actualizar los datos y la tabla
        traerDatos();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para eliminar un elemento de la API
function borrar(id) {
    fetch(`${DATA_URL}${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(() => { 
            // Después de eliminar, actualizar los datos y la tabla
            traerDatos();
        });
}

// Función para crear la tabla a partir de los datos
function hacerTable(array) {
    let contenedor = document.getElementById('listaDatos');
    contenedor.innerHTML = ""
    array.forEach((element, index) => {

        contenedor.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.grupo}</td>
            <td>${element.sala}</td>
            <td><button id="${element._id}id" class="btn btn-success botonEditar"></td>
            <td><button id="${element._id}" class="btn btn-danger botonBorrar"></td>
        </tr>
        `
    });
}

// Evento que se dispara cuando el DOM ha cargado
document.addEventListener('DOMContentLoaded', () => {

    // Cargar datos inmediatamente y cada 1.5 segundos
    setTimeout(traerDatos, 0);   // Retrasa la ejecución de la función 
    setInterval(traerDatos, 1500); // Ejecuta la función en intervalos de tiempo según su parámetro

    let tabla = document.getElementById('tablaDatos');
    let modificar = document.getElementById('modificar');

    // Evento de clic en la tabla
    tabla.addEventListener('click', (e) => {

        if (e.target.classList.contains('botonBorrar')){
            // Si se hace clic en un botón de borrado, obtener el ID y borrar
            let id = e.target.id;
            console.log(id);
            borrar(id)
        } else if (e.target.classList.contains('botonEditar')){
            // Si se hace clic en un botón de edición, obtener el ID y mostrar los datos en el formulario
            let id = e.target.id.replace('id', '');

            // Buscar los datos del elemento en la lista
            let filaAEditar = lista.find(element => element._id === id);

            // Llenar el formulario con los datos del elemento
            document.getElementById('nombre').value = filaAEditar.nombre;
            document.getElementById('apellido').value = filaAEditar.apellido;
            document.getElementById('grupo').value = filaAEditar.grupo;
            document.getElementById('sala').value = filaAEditar.sala;
            document.getElementById('fila').value = filaAEditar._id;

            // Mostrar el formulario de edición
            document.getElementById('ingresar').classList.remove('hidden');      
        }
    })

    modificar.addEventListener('click', () => {

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let grupo = document.getElementById('grupo').value;
        let sala = document.getElementById('sala').value;
        let id = document.getElementById('fila').value;

        let nuevosDatos = {
            nombre: nombre,
            apellido: apellido,
            grupo: grupo,
            sala: sala
        };
    
        // Llamar a la función de edición con los nuevos datos
        editar(id, nuevosDatos);
    
        // Ocultar el formulario de edición
        document.getElementById('ingresar').classList.add('hidden');
    });

})