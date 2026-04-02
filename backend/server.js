const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

//IMPORTAR LAS VALIDACIONES
const { validarLibro } = require('./validations/libroValidation');
const { validarAutor } = require('./validations/autorValidation');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './biblioteca.db'
  },
  useNullAsDefault: true
});

//crear tabla Autores si no existe
db.schema.hasTable('autores').then((exists) => {
    if (!exists) {
        return db.schema.createTable('autores', (table) => {
            table.increments('id').primary();
            table.string('nombre');
            table.string('nacionalidad');
        });
    }
});

//crear tabla Libros si no existe
db.schema.hasTable('libros').then((exists) => {
    if (!exists) {
        return db.schema.createTable('libros', (table) => {
            table.increments('id').primary();
            table.string('titulo');
            table.integer('anio');
            table.integer('autor_id').references('id').inTable('autores');
        });
    }
});



// LEER todos los libros
app.get('/api/libros', async (req, res) => {
  try {
    const libros = await db('libros').select('*');
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

//CREAR UN NUEVO LIBRO
app.post('/api/libros', validarLibro,async (req, res) => {
  try {
    const { titulo, anio, autor_id } = req.body;
    const [id] = await db('libros').insert({ titulo, anio, autor_id });
    res.json({ mensaje: 'Libro creado', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el libro' });
  }
});

//ACTUALIZAR UN LIBRO
app.put('/api/libros/:id',  validarLibro, async (req, res) => {
    try {
        const { titulo, anio, autor_id } = req.body;
        await db('libros').where({ id: req.params.id }).update({ titulo, anio, autor_id });
        res.json({ mensaje: 'Libro actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

//ELIMINAR UN LIBRO
app.delete('/api/libros/:id', async (req, res) => {
    try {
        await db('libros').where({ id: req.params.id }).del();
        res.json({ mensaje: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

// LEER AUTORES
app.get('/api/autores', async (req, res) => {
    try {
        const autores = await db('autores').select('*');
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

// CREAR AUTORES
app.post('/api/autores', validarAutor, async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;
        const [id] = await db('autores').insert({ nombre, nacionalidad });
        res.json({ mensaje: 'Autor creado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el autor' });
    }
});

// EDITAR AUTORES
app.put('/api/autores/:id', validarAutor, async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;
        await db('autores').where({ id: req.params.id }).update({ nombre, nacionalidad });
        res.json({ mensaje: 'Autor actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
});

// ELIMINAR AUTORES
app.delete('/api/autores/:id', async (req, res) => {
    try {
        await db('autores').where({ id: req.params.id }).del();
        res.json({ mensaje: 'Autor eliminado' });
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el autor'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


