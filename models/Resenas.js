const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResenaSchema = new mongoose.Schema({
  //relacion de la reseña con un juego espefico
  juego : {
    type: Schema.Types.ObjectId, //referencia a un juego
    ref: 'Juego', //nombre del modelo al que se refiere
    required: true, //campo obligatorio
  },
  puntuacion : {
    type: Number, //numero
    required: [true, 'La puntuación de la reseña es obligatoria Bro'], //campo obligatorio
    min: 1, //no puede ser negativo
    max: 5, //no puede ser mayor a 5
  },
  usuario : {
    type: Schema.Types.ObjectId, //referencia a un usuario
    ref: 'Usuario', //nombre del modelo al que se refiere
    required: false, //campo no obligatorio
    default: 'Usuario Anonimo', //si no se especifica por defecto es null
  },
  contenido : {
    type: String, //texto
    required: [true, 'El contenido de la reseña es obligatorio Bro'], //campo obligatorio
    trim: true, //quita los espacios en blanco al inicio y al final
  },
  
},{
  timestamps: true, 
});

module.exports = mongoose.model('Resena', ResenaSchema);

