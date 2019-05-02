var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var peliSchema = new Schema({
    nombre: {type: String,required:[true,'Nombre obligatorio']},
    anio: { type: String, required: [true, 'El año es obligatorio'] },
    genero: { type: [String], required: [true, 'El genero es obligatorio'] },
    descripcion: { type: String, required: [true, 'La descripcion es obligatoria'] },
    trailer: { type: String },
    poster: {type: String}
});

var Peli = mongoose.model('pelicula', peliSchema);
module.exports = Peli;
