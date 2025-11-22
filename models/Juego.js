const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  nombre : {
    type: String, //texto
    required: [true, 'El nombre del juego es obligatorio Bro'], //campo obligatorio
    trim: true, //quita los espacios en blanco al inicio y al final
    unique: true, //no puede haber dos juegos con el mismo nombre, osea que es unico
  },
  plataforma : {
    type: String, //texto
    required: [true, 'La plataforma del juego es obligatoria Bro'], //campo obligatorio
    trim: true, //quita los espacios en blanco al inicio y al final
    unique: true, //no puede haber dos juegos con la misma plataforma, osea que es unico
  },
  portadaURL : {
    type: String, //texto
    required: false, //campo opcional ya que es false si fuera true si es obligatorio
  },
  estado : {
    type: String, //texto
    enum: ['Pendiente', 'Jugado', 'Completado'], //estado del juego si no se especifica por defecto es Pendiente
    default: 'Pendiente', 
  },
  horasJugadas : {
    type: Number, //numero
    default: 0, //si no se especifica por defecto es 0
    min: 0, //no puede ser negativo
  }

},{
  timestamps: true, //crea dos campos createdAt y updatedAt que guardan la fecha y hora de la creacion y actualizacion del juego
});

module.exports = mongoose.model('Juego', JuegoSchema);
