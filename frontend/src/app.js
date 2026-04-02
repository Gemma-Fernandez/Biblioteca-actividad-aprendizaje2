// La dirección donde está escuchando nuestro servidor backend
const ApiUrl = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    cargarAutores();
    cargarLibros();
});

// LEER AUTORES (GET)
async function cargarAutores() {
    const respuesta = await fetch(`${ApiUrl}/autores`);
    const autores = await respuesta.json();
    
    const tbody = document.getElementById('tabla-autores');
    const selectAutores = document.getElementById('libro-autor_id');
    
    // Limpiamos la tabla
    tbody.innerHTML = '';
    selectAutores.innerHTML = '<option value="">Selecciona un autor...</option>';

    autores.forEach(autor => {
        // Dibujar la fila en la tabla
        tbody.innerHTML += `
            <tr>
                <td>${autor.id}</td>
                <td>${autor.nombre}</td>
                <td>${autor.nacionalidad}</td>
                <td>
                    <button onclick="prepararEdicionAutor(${autor.id}, '${autor.nombre}', '${autor.nacionalidad}')">Editar</button>
                    <button onclick="eliminarAutor(${autor.id})">Borrar</button>
                </td>
            </tr>
        `;
        //Añadir el autor al desplegable del formulario de libros
        selectAutores.innerHTML += `<option value="${autor.id}">${autor.nombre}</option>`;
    });
}

// CREAR (POST) o EDITAR (PUT) AUTOR
document.getElementById('form-autor').addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evita que la página se recargue
    
    const id = document.getElementById('autor-id').value;
    const nombre = document.getElementById('autor-nombre').value;
    const nacionalidad = document.getElementById('autor-nacionalidad').value;
    
    // Si hay un ID en el campo, es que estamos editando. Si no, creando.
    const metodo = id ? 'PUT' : 'POST';
    const ruta = id ? `${ApiUrl}/autores/${id}` : `${ApiUrl}/autores`;

    await fetch(ruta, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, nacionalidad })
    });

    //Limpiamos formulario y recargamos la tabla
    document.getElementById('form-autor').reset();
    document.getElementById('autor-id').value = '';
    cargarAutores();
});

//Rellenar formulario para editar
function prepararEdicionAutor(id, nombre, nacionalidad) {
    document.getElementById('autor-id').value = id;
    document.getElementById('autor-nombre').value = nombre;
    document.getElementById('autor-nacionalidad').value = nacionalidad;
}

// ELIMINAR AUTOR (DELETE)
async function eliminarAutor(id) {
    if (confirm('¿Seguro que quieres borrar este autor?')) {
        await fetch(`${ApiUrl}/autores/${id}`, { method: 'DELETE' });
        cargarAutores();
        cargarLibros(); 
    }
}

// LEER LIBROS (GET)
async function cargarLibros() {
    const respuesta = await fetch(`${ApiUrl}/libros`);
    const libros = await respuesta.json();
    
    const tbody = document.getElementById('tabla-libros');
    tbody.innerHTML = '';

    libros.forEach(libro => {
        tbody.innerHTML += `
            <tr>
                <td>${libro.id}</td>
                <td>${libro.titulo}</td>
                <td>${libro.anio}</td>
                <td>${libro.autor_id}</td>
                <td>
                    <button onclick="prepararEdicionLibro(${libro.id}, '${libro.titulo}', ${libro.anio}, ${libro.autor_id})">Editar</button>
                    <button onclick="eliminarLibro(${libro.id})">Borrar</button>
                </td>
            </tr>
        `;
    });
}

// CREAR (POST) o EDITAR (PUT) LIBRO
document.getElementById('form-libro').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    const id = document.getElementById('libro-id').value;
    const titulo = document.getElementById('libro-titulo').value;
    const anio = document.getElementById('libro-anio').value;
    const autor_id = document.getElementById('libro-autor_id').value;
    
    const metodo = id ? 'PUT' : 'POST';
    const ruta = id ? `${ApiUrl}/libros/${id}` : `${ApiUrl}/libros`;

    await fetch(ruta, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, anio, autor_id })
    });

    document.getElementById('form-libro').reset();
    document.getElementById('libro-id').value = '';
    cargarLibros();
});

// Rellenar el formulario para editar
function prepararEdicionLibro(id, titulo, anio, autor_id) {
    document.getElementById('libro-id').value = id;
    document.getElementById('libro-titulo').value = titulo;
    document.getElementById('libro-anio').value = anio;
    document.getElementById('libro-autor_id').value = autor_id;
}

// ELIMINAR LIBRO (DELETE)
async function eliminarLibro(id) {
    if (confirm('¿Seguro que quieres borrar este libro?')) {
        await fetch(`${ApiUrl}/libros/${id}`, { method: 'DELETE' });
        cargarLibros();
    }
}