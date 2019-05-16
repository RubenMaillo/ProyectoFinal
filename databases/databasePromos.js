const Promo = require('../models/promos');


exports.addPromo=async function(req){
    var promo = new Promo({
        tipoPromo:req.body.tipo,
        descripcion:req.body.descrip,
        descuento:req.body.descu
    });
    await promo.save();
}
exports.verPromos= async function(req){
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Promo.find().countDocuments();
    var promos = await Promo.find()
    .skip((limitPag * pag) - limitPag)
    .limit(limitPag);
    var v1 = promos;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.busquedaPromos = async function(req){
    var busq = req.query.busqueda;
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Promo.find({
        $or:[
            {tipoPromo:{$regex:busq,$options:"$i"}}
        ]
    }).countDocuments();
    var promos = await Promo.find({
        $or:[
            {tipoPromo:{$regex:busq,$options:"$i"}}
        ]
    })
    .skip((limitPag*pag)- limitPag)
    .limit(limitPag);
    var v1 = promos;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.borrarPromo = async function(req){
    var id = req.params.id;
    var resp = await Promo.deleteOne({_id:id});
    return resp;
  }
 exports.editPromo = async function(req){
    var promo = await Promo.updateOne(
       {_id:req.body._id,},
       {
        tipoPromo:req.body.tipo,
        descripcion:req.body.descrip,
        descuento:req.body.descu
       },
 
       
    );
 }
 exports.datosPromo = async function(req){
    var id = req.params.id;
    var promo = await Promo.findOne({_id:id});
    return promo;
}