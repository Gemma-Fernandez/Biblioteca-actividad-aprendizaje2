const knex = require('knex');

// Nos conectamos a la misma base de datos
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './biblioteca.db'
    },
    useNullAsDefault: true
});

async function subirBaseDeDatos() {
    try {
        console.log('Subiendo datos de prueba...');

        //Insertamos unos Autores
        await db('autores').insert([
            { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana' },
            { nombre: 'J.K. Rowling', nacionalidad: 'Británica' },
            { nombre: 'Isaac Asimov', nacionalidad: 'Estadounidense' }
        ]);
        console.log('Autores insertados.');

        //Insertamos Libros asociándolos a los IDs de esos autores
        await db('libros').insert([
            { titulo: 'Cien años de soledad', anio: 1967, autor_id: 1 },
            { titulo: 'Harry Potter y la piedra filosofal', anio: 1997, autor_id: 2 },
            { titulo: 'Fundación', anio: 1951, autor_id: 3 }
        ]);
        console.log('Libros insertados.');

    } catch (error) {
        console.error('Error al insertar datos:', error.message);
    } finally {
        // Cerramos la conexión para que el script termine
        db.destroy();
    }
}

// Ejecutamos la función
subirBaseDeDatos();