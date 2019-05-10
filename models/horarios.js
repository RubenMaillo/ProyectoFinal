var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var horarioSchema = new Schema({
    pelicula: {type: String,required:[true,'La película es obligatoria']},
    fecha: { type: String, required: [true, 'La fecha es obligatoria'] },
    hora: { type: String, required: [true, 'La hora es obligatoria'] }
});

var Horario = mongoose.model('horario', horarioSchema);
module.exports = Horario;
