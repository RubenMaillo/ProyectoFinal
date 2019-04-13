const mongoose = require('mongoose');
const Sala = require('../models/salas')

exports.initializeMongo = function(){
            mongoose.connect('mongodb://mongo/salas',{useNewUrlParser:true})
            .then(() => console.log('WEEE!'))
            .catch(err => console.error('Eppa', err));
}

exports.addSala=async function(req){
    var sala = new Sala({
        numSala:req.body.numSala,
        capadidad:req.body.capacidad,
    });
    await sala.save();
}
exports.verSalas= async function(req){
    var salas = await Sala.find();
    return salas;
}
exports.busquedaSalas = async function(req){
    var salas = await Sala.find({

    })
}