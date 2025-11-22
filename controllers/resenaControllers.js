const Resena = require('../models/Resenas');
const mongoose = require('mongoose');

// C - crear una reseña
exports.crearResena = async (req, res) => {
  try {
    const resena = new Resena(req.body);
    await resena.save();
    res.status(201).json(resena);
    //devuelve la reseña creada con el estado 201 Created, osea que está bien creada
  } catch (error) {
    res.status(400).json({
      //devuelve el error con el estado 400 Bad Request, osea que hay un error en la solicitud
      error: 'Error al agregar la reseña, verifique los datos',
      details: error.message 
    });  
  }
};

// R - obtener todas las reseñas
exports.obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.find().populate('juego', 'titulo genero'); // Populamos el juego relacionado
    res.status(200).json(resenas);
    //devuelve la lista de reseñas con el estado 200 OK, osea que está bien
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error interno del servidor al obtener las reseñas',
      details: error.message 
    });  
  }
};

// R - obtener una reseña por id
exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id).populate('juego', 'titulo genero');
    if (!resena) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontró la reseña
        error: 'Reseña no encontrada'
      });
    }
    res.status(200).json(resena);
    //devuelve la reseña con el estado 200 OK, osea que está bien
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error al obtener la reseña, vuelva a intentarlo',
      details: error.message 
    });  
  }
};

// R - obtener reseñas por juego específico
exports.obtenerResenasPorJuego = async (req, res) => {
  try {
    const resenas = await Resena.find({ juego: req.params.juegoId }).populate('juego', 'titulo genero');
    if (!resenas || resenas.length === 0) {
      return res.status(404).json({
        //devuelve mensaje cuando no hay reseñas para ese juego
        message: 'No se encontraron reseñas para este juego'
      });
    }
    res.status(200).json(resenas);
    //devuelve las reseñas del juego específico con el estado 200 OK
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error
      error: 'Error al obtener las reseñas del juego',
      details: error.message 
    });  
  }
};

// U - actualizar una reseña por id
exports.actualizarResena = async (req, res) => {
  try {
    const resena = await Resena.findByIdAndUpdate(req.params.id, req.body,
    { new: true,
      runValidators: true }).populate('juego', 'titulo genero');
    if (!resena) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontró la reseña
        error: 'Reseña no encontrada'
      });
    }
    res.status(200).json(resena);
    //devuelve la reseña actualizada con el estado 200 OK, osea que está bien
  } catch (error) {
    res.status(400).json({
      //devuelve el error con el estado 400 Bad Request, osea que hay un error en la solicitud
      error: 'Error al actualizar la reseña, verifique los datos',
      details: error.message 
    });  
  }
}; 

// D - eliminar una reseña por id
exports.eliminarResena = async (req, res) => {
  try {
    const resena = await Resena.findByIdAndDelete(req.params.id);
    if (!resena) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontró la reseña
        error: 'Reseña no encontrada'
      });
    }
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error interno del servidor al eliminar la reseña',
      details: error.message 
    });  
  }
};  

// R - obtener estadísticas de reseñas por juego (función adicional útil)
exports.obtenerEstadisticasResenas = async (req, res) => {
  try {
    const stats = await Resena.aggregate([
      {
        $match: { juego: mongoose.Types.ObjectId(req.params.juegoId) }
      },
      {
        $group: {
          _id: '$juego',
          promedioCalificacion: { $avg: '$puntuacion' },
          totalResenas: { $sum: 1 },
          puntuacionMinima: { $min: '$puntuacion' },
          puntuacionMaxima: { $max: '$puntuacion' }
        }
      }
    ]);
    
    if (!stats || stats.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron estadísticas para este juego'
      });
    }
    
    res.status(200).json(stats[0]);
    //devuelve las estadísticas del juego con el estado 200 OK
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error
      error: 'Error al obtener las estadísticas de las reseñas',
      details: error.message 
    });  
  }
};
