const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegoController');

// Ruta para obtener todos los juegos
router.get('/juegos', juegosController.obtenerJuegos);
// Ruta para obtener un juego por su ID
router.get('/juegos/:id', juegosController.obtenerJuegoPorId);
// Ruta para crear un nuevo juego
router.post('/juegos', juegosController.crearJuego);
// Ruta para actualizar un juego existente
router.put('/juegos/:id', juegosController.actualizarJuego);
// Ruta para eliminar un juego
router.delete('/juegos/:id', juegosController.eliminarJuego);


module.exports = router;