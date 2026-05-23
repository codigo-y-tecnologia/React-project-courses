const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

// Crear la aplicación Express
const app = express();
const port = 3000;

app.use(cors());

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Courses'
});

// Conectar a la base de datos MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Conexión a la base de datos establecida');
});

// Ruta para cargar imágenes y guardar en la base de datos
app.post('/upload', upload.single('image'), (req, res) => {
    // Verificar si se ha subido el archivo
    if (!req.file) {
        return res.status(400).send('No se ha subido ninguna imagen');
    }

    // Obtener los datos del formulario
    const { nombreCurso, descripcionCurso } = req.body;

    // Convertir la imagen a formato buffer para almacenar en la base de datos
    const image = req.file.buffer;

    // Consultar para guardar la información en la base de datos
    const query = 'INSERT INTO tbl_cursos (vNombre, tDescripcion, bImagen) VALUES (?, ?, ?)';

    db.query(query, [nombreCurso, descripcionCurso, image], (err, result) => {
        if (err) {
            return res.status(500).send('Error al guardar la imagen en la base de datos');
        }
        res.send('Imagen y curso registrados correctamente');
    });
});

// Nueva ruta para obtener los cursos
app.get('/api/cursos', (req, res) => {
    const query = 'SELECT id, vNombre, tDescripcion, bImagen FROM tbl_cursos';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los cursos');
        }

        // Transformar cada registro para incluir la imagen como base64
        const cursos = results.map((curso) => ({
            id: curso.id,
            vNombre: curso.vNombre,
            tDescripcion: curso.tDescripcion,
            bImagen: `data:image/jpeg;base64,${curso.bImagen.toString('base64')}`
        }));

        res.json(cursos);
    });
});

// Ruta para modificar un curso existente
app.put('/api/cursos/:id', upload.single('imagen'), (req, res) => {
    const cursoId = req.params.id;
    const { nombreCurso, descripcionCurso } = req.body;
    const nuevaImagen = req.file ? req.file.buffer : null;

    let query;
    let params;

    if (nuevaImagen) {
        query = 'UPDATE tbl_cursos SET vNombre = ?, tDescripcion = ?, bImagen = ? WHERE id = ?';
        params = [nombreCurso, descripcionCurso, nuevaImagen, cursoId];
    } else {
        query = 'UPDATE tbl_cursos SET vNombre = ?, tDescripcion = ? WHERE id = ?';
        params = [nombreCurso, descripcionCurso, cursoId];
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error al actualizar el curso:', err);
            return res.status(500).json({ error: 'Error al actualizar el curso' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json({
            message: 'Curso actualizado correctamente',
            id: cursoId,
            nombreCurso,
            descripcionCurso,
        });
    });
});

// Nueva ruta para eliminar un curso
app.delete('/api/cursos/:id', (req, res) => {
    const cursoId = req.params.id;

    const query = 'DELETE FROM tbl_cursos WHERE id = ?';

    db.query(query, [cursoId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el curso:', err);
            return res.status(500).json({ error: 'Error al eliminar el curso' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json({ message: 'Curso eliminado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
