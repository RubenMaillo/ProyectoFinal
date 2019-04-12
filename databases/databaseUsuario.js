const mongoose = require('mongoose');
const Usuario = require('../models/usuarios')

exports.initializeMongo = function(){
            mongoose.connect('mongodb://mongo/usuarios',{useNewUrlParser:true})
            .then(() => console.log('WEEE!'))
            .catch(err => console.error('Eppa', err));
}

exports.verusus = async function(){
    var usus = await Usuario.find();
    return usus;
 }
 exports.addUsu = async function(req){
    var usu = new Usuario({
       dni:req.body.dni,
       nombre:req.body.nombre,
       apellidos:req.body.apellidos,
       email:req.body.user,
       password: req.body.pass,
       telefono:req.body.telefono,
       tipo:'usuario',
       alucineCard: true,
       puntos: 0
    });
    var result = await usu.save();
    console.log(result);
}
 exports.sessionUsu = async function(req){
    var usu = await Usuario.find({
        email: req.body.user,
        password: req.body.pass
        });
    //console.log(usu[0]);
    return usu[0];
    
 }
 exports.test = async function(req){
   await console.log(req)
 }
 exports.busquedaUsus = async function(req){
    var usu = await Usuario.find({
       email:"/"+req.body.busqueda+"/" 
    });
    console.log("EMAIL: "+usu[0]);
 }
