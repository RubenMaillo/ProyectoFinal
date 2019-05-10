var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    dni: { type: String, required: [true, 'El DNI obligatoria'] },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellidos: { type: String, required: [true, 'El apellidos son obligatorios'] },
    email: { type: String, required: [true, 'El email es obligatorio'] }, 
    telefono:{type:String, required:[true,'El telefono es obligatorio']},
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    tipo: {type: String, required: [true,'El tipo de usuario es obligatorio']},
    alucineCard: {type:Boolean, required: [true,'']},
    puntos: {type:Number}
});

var Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;
