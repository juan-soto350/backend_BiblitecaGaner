const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaControllers');

// rutas crud para reseñas
router.post('/', resenaController.crearResena); // C - crear una reseña
router.get('/', resenaController.obtenerResenas); // R - obtener todas las reseñas
router.get('/:id', resenaController.obtenerResenaPorId); // R - obtener una reseña por id                   
router.get('/juego/:juegoId', resenaController.obtenerResenasPorJuego); // R - obtener reseñas por juego específico
router.put('/:id', resenaController.actualizarResena); // U - actualizar una reseña por id
router.delete('/:id', resenaController.eliminarResena); // D - eliminar una reseña por id
router.get('/estadisticas/:juegoId', resenaController.obtenerEstadisticasResenas); // R - obtener estadísticas de reseñas por juego

module.exports = router;