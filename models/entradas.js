var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entradaSchema = new Schema({

    idHorario: { type: String, required: [true, 'El horario es obligatorio'] },
    idPelicula: { type: String, required: [true, 'La película es obligatoria'] },
    idUsuario: { type: String, required: [true, 'El usuario es obligatorio'] },
   // idSala: { type: String, required: [true, 'La sala es obligatoria'] },
    fila: { type: Number, required: [true, 'La fila es obligatoria'] },
    butaca: { type: Number, required: [true, 'El número de butaca es obligatorio'] },
    precio: { type: Number, required: [true, 'El precio es obligatorio'] },
});

var Entrada = mongoose.model('entrada', entradaSchema);
module.exports = Entrada;
