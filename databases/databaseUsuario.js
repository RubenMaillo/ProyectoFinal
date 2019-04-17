const Usuario = require('../models/usuarios');

exports.verusus = async function(){
    var usus = await Usuario.find().limit(2);
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
   var busq = req.body.busqueda;
    var usu = await Usuario.find({
       $or:[
         {email:{$regex:busq,$options:"$i"}},
         {dni:{$regex:busq,$options:"$i"}},
         {nombre:{$regex:busq,$options:"$i"}},
         {apellidos:{$regex:busq,$options:"$i"}}]
      });
    return usu;
 }
