var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var salaSchema = new Schema({

    numSala: { type: String, required: [true, 'El numero de sala es obligatorio'] },
    capacidad: { type: Number, required: [true, 'La capacidad es obligatoria'] }
});

var Sala = mongoose.model('sala', salaSchema);
module.exports = Sala;
