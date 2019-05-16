const Sala = require('../models/salas');


exports.addSala=async function(req){
    var sala = new Sala({
        numSala:req.body.numSala,
        capacidad:req.body.capacidad
    });
    await sala.save();
}
exports.verSalas= async function(req){
    var limitPag = 10;
    var pag = req.params.pagina;
    var cuenta = await Sala.find().countDocuments();
    var salas = await Sala.find()
    .skip((limitPag * pag) - limitPag)
    .limit(limitPag);
    var v1 = salas;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.busquedaSalas = async function(req){
    var busq = req.query.busqueda;
    var limitPag = 10;
    var pag = req.params.pagina;
    var cuenta = await Sala.find({
        $or:[
            {numSala:{$regex:busq,$options:"$i"}}
        ]
    }).countDocuments();
    var salas = await Sala.find({
        $or:[
            {numSala:{$regex:busq,$options:"$i"}}
        ]
    })
    .skip((limitPag*pag)- limitPag)
    .limit(limitPag);
    var v1 = salas;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.borrarSala = async function(req){
    var id = req.params.id;
    var resp = await Sala.deleteOne({_id:id});
    return resp;
  }
 exports.editSala = async function(req){
    var sala = await Sala.updateOne(
       {_id:req.body._id},
       {
        numSala:req.body.numSala,
        capacidad:req.body.capacidad
       }
    );
 }
 exports.datosSala = async function(req){
    var id = req.params.id;
    var sala = await Sala.findOne({_id:id});
    return sala;
}