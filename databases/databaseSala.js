const Sala = require('../models/salas');


exports.addSala=async function(req){
    var sala = new Sala({
        numSala:req.body.numSala,
        capacidad:req.body.capacidad
    });
    await sala.save();
}
exports.verSalas= async function(req){
    var salas = await Sala.find();
    return salas;
}
exports.busquedaSalas = async function(req){
    var busq = req.body.busqueda;
    var salas = await Sala.find({
        $or:[
            {numSala:{$regex:busq,$options:"$i"}},
            {capacidad:{$regex:busq,$option:"$i"}}
        ]
    });
    return salas;
}