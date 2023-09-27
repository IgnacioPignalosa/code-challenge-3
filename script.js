const DATA_URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/';

let lista = [];

function traerDatos() {
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            lista = data;
            hacerTable(data);
        })
}

function editar(id, nuevosDatos) {
    fetch(`${DATA_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevosDatos)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al editar el elemento.');
        }
    })
    .then(() => {
        traerDatos();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function borrar(id) {
    fetch(`${DATA_URL}${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(() => { traerDatos() });

}

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

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(traerDatos, 0)   // Retrasa la ejecucion de la funcion 
    setInterval(traerDatos, 1500) // EJecuta la funcion en intervalos de tiempo segun su parametro

    let tabla = document.getElementById('tablaDatos');
    let enviar = document.getElementById('enviar');

    tabla.addEventListener('click', (e) => {

        if (e.target.classList.contains('botonBorrar')){
            let id = e.target.id;
            console.log(id);
            borrar(id)
        } else if (e.target.classList.contains('botonEditar')){
            let id = e.target.id.replace('id', '');

            let filaAEditar = lista.find(element => element._id === id);
            document.getElementById('nombre').value = filaAEditar.nombre;
            document.getElementById('apellido').value = filaAEditar.apellido;
            document.getElementById('grupo').value = filaAEditar.grupo;
            document.getElementById('sala').value = filaAEditar.sala;

            document.getElementById('ingresar').classList.remove('hidden');      
        }
    })

    enviar.addEventListener('click', (e) => {

        let id = e.target.id.replace('id', '');

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let grupo = document.getElementById('grupo').value;
        let sala = document.getElementById('sala').value;
    
        let nuevosDatos = {
            nombre: nombre,
            apellido: apellido,
            grupo: grupo,
            sala: sala
        };
    
        editar(id, nuevosDatos);
    
        document.getElementById('ingresar').classList.add('hidden');
    });

})

