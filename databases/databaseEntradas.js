const Entrada = require('../models/entradas');
const Peli = require('../models/peliculas');
const Hora = require('../models/horarios')

exports.addEntrada = async function(req,sesion){
    var entrada = new Entrada({
        idHorario:sesion[3][0],
        idPelicula:sesion[2][0],
        idUsuario:req.session.user,
        butaca:sesion[1],
        fila:sesion[0],
        precio: 6.5
    });
    await entrada.save();
}
exports.getSesion = async function(req){
    var pelicula = req.query.pelicula;
    var hora = req.query.hora;
    var datos = [pelicula,hora];
    return datos;
}

exports.verButaca = async function(req){
    var nombre = await Peli.findOne({_id:req.query.pelicula});
    var hora = await Hora.findOne({_id:req.query.hora});
    var fila = req.query.fila;
    var butaca = req.query.butaca;
    var pelicula = [req.query.pelicula,nombre.nombre];
    var hora = [req.query.hora,hora.hora];
    var asiento = [fila,butaca,pelicula,hora]
    return asiento;
}
exports.verEntradas = async function(req){
    var entradas = await Entrada.find({idHorario:req.query.hora});
    //console.log(entradas.fila);
    return entradas;
}
