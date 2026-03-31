const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './biblioteca.db'
  },
  useNullAsDefault: true
});

// LEER todos los libros
app.get('/libros', async (req, res) => {
  try {
    const libros = await db('libros').select('*');
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

//CREAR UN NUEVO LIBRO
app.post('/libros', async (req, res) => {
  try {
    const { titulo, autor, genero } = req.body;
    const [id] = await db('libros').insert({ titulo, autor, genero });
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el libro' });
  }
});

//ACTUALIZAR UN LIBRO
app.put('/libros/:id', async (req, res) => {
    try {
        const { titulo, autor, genero } = req.body;
        await db('libros').where({ id: req.params.id }).update({ titulo, autor, genero });
        res.json({ mensaje: 'Libro actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

//ELIMINAR UN LIBRO
app.delete('/api/autores/:id', async (req, res) => {
    try {
        await db('autores').where({ id: req.params.id }).del();
        res.json({ mensaje: 'Autor eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

