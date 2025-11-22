const Juego = require('../models/Juego'); 

// C - crear un juego
exports.crearJuego = async (req, res) => {
  try {
    const juego = new Juego(req.body);
    await juego.save();
    res.status(201).json(juego);
    //devuelve el juego creado con el estado 201 Created, osea que esta bien creado
  }catch (error) {
    res.status(400).json({
      //devuelve el error con el estado 400 Bad Request, osea que hay un error en la solicitud
      error: 'Error el agregrar el juego, verifique los datos',
      details: error.message 
    });  
  };
};

// R - obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.status(200).json(juegos);
    //devuelve la lista de juegos con el estado 200 OK, osea que esta bien
  }catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error interno del servidor al obtener los juegos',
      details: error.message 
    });  
  };
};

// R - obtener un juego por id
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontro el juego
        error: 'Juego no encontrado'
      });
    }
    res.status(200).json(juego);
    //devuelve la lista de juegos con el estado 200 OK, osea que esta bien
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error al obtener el juego, vuelva a intentarlo',
      details: error.message 
    });  
  };
};

// U - actualizar un juego por id
exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body,
    { new: true,
      runValidators: true   });
    if (!juego) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontro el juego
        error: 'Juego no encontrado'
      });
    }
    res.status(200).json(juego);
    //devuelve el juego actualizado con el estado 200 OK, osea que esta bien
  } catch (error) {
    res.status(400).json({
      //devuelve el error con el estado 400 Bad Request, osea que hay un error en la solicitud
      error: 'Error al actualizar el juego, verifique los datos',
      details: error.message 
    });  
  };
}; 

// D - eliminar un juego por id
exports.eliminarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) {
      return res.status(404).json({
        //devuelve el error con el estado 404 Not Found, osea que no se encontro el juego
        error: 'Juego no encontrado'
      });
    }
    res.status(200).json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({
      //devuelve el error con el estado 500 Internal Server Error, osea que hay un error en el servidor
      error: 'Error interno del servidor al eliminar el juego',
      details: error.message 
    });  
  }
};  

