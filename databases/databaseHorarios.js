const Horario = require('../models/horarios');


exports.addHorario = async function(req){
    var horario = new Horario({
        idPeli:req.body.idPeli,
        idPromo:req.body.idPromo,
        fecha:req.body.fecha,
        hora:req.body.hora
    });
    await horario.save();
}
exports.verHorarios = async function(req){
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Horario.find().countDocuments();
    var horarios = await Horario.find()
    .skip((limitPag * pag) - limitPag)
    .limit(limitPag);
    var v1 = horarios;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.busquedaHorarios = async function(req){
    var busq = req.query.busqueda;
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Horario.find({
        $or:[
            {idPeli:{$regex:busq,$options:"$i"}},
            {idPromo:{$regex:busq,$options:"$i"}},
            {fecha:{$regex:busq,$options:"$i"}},
            {hora:{$regex:busq,$options:"$i"}}
        ]
    }).countDocuments();
    var horarios = await Horario.find({
        $or:[
            {idPeli:{$regex:busq,$options:"$i"}},
            {idPromo:{$regex:busq,$options:"$i"}},
            {fecha:{$regex:busq,$options:"$i"}},
            {hora:{$regex:busq,$options:"$i"}}
        ]
    })
    .skip((limitPag*pag)- limitPag)
    .limit(limitPag);
    var v1 = horarios;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}