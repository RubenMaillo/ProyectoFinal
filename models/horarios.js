var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var horarioSchema = new Schema({
    idPeli: {type: String,required:[true,'idPeli']},
    idPromo: { type: String, required: [true, 'idPromo'] },
    fecha: { type: String, required: [true, 'La fecha es obligatoria'] },
    hora: { type: String, required: [true, 'La hora es obligatoria'] }
});

var Horario = mongoose.model('horario', horarioSchema);
module.exports = Horario;
