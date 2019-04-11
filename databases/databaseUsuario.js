const mongoose = require('mongoose');
const Usuario = require('../models/usuarios')

exports.initializeMongo = function(){
            mongoose.connect('mongodb://mongo/usuarios',{useNewUrlParser:true})
            .then(() => console.log('WEEEkiwkikiwiwi!'))
            .catch(err => console.error('Eppa', err));
}

exports.verusus = async function(){
    var usus = await Usuario.find({dni:'45199304A'});
    console.log(usus)
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
 exports.sessionUsu = async function(email,pass){
    var usu = await Usuario.find({
        email: email,
        password: pass
        });
    console.log('wawla'+usu['_id']);
 }
