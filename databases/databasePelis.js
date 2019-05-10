const Peli = require('../models/peliculas');


exports.addPeli=async function(req){
    var peli = new Peli({
        nombre:req.body.nombre,
        anio:req.body.anio,
        genero:req.body.genero,
        descripcion:req.body.descripcion,
        trailer:req.body.trailer,
        poster:req.body.poster
    });
    await peli.save();
}

exports.verPelis= async function(req){
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Peli.find().countDocuments();
    var pelis = await Peli.find()
    .skip((limitPag * pag) - limitPag)
    .limit(limitPag);
    var v1 = pelis;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}

exports.verPelisF= async function(req){
    var pelis = await Peli.find()
    return pelis;
}

exports.datosPeli = async function(req){
    var id=req.params.id;
    var pelicula = await Peli.findOne({_id:id});
    return pelicula;
}

exports.busquedaPelis = async function(req){
    var busq = req.query.busqueda;
    var limitPag = 2;
    var pag = req.params.pagina;
    var cuenta = await Peli.find({
        $or:[
            {nombre:{$regex:busq,$options:"$i"}},
            {anio:{$regex:busq,$options:"$i"}},
            {genero:{$regex:busq,$options:"$i"}}
        ]
    }).countDocuments();
    var pelis = await Peli.find({
        $or:[
            {nombre:{$regex:busq,$options:"$i"}},
            {anio:{$regex:busq,$options:"$i"}},
            {genero:{$regex:busq,$options:"$i"}}
        ]
    })
    .skip((limitPag*pag)- limitPag)
    .limit(limitPag);
    var v1 = pelis;
    var v2 = pag;
    var v3 = Math.ceil(cuenta/limitPag);
    var v4 = Number(pag)+1;
    var v5 = Number(pag)-1;
    var datos = [v1,v2,v3,v4,v5];
    return datos;
}
exports.borrarPeli = async function(req){
    var id = req.params.id;
    console.log(id);
    var resp = await Usuario.deleteOne({_id:id});
    console.log(resp);
    return resp;
  }
 exports.editPeli = async function(req){
    console.log(req.body._id);
    var usu = await Usuario.updateOne(
       {_id:req.body._id,},
       {
          dni:req.body.dni,
          nombre:req.body.nombre,
          apellidos:req.body.apellidos,
          email:req.body.user,
          password: req.body.pass,
          telefono:req.body.telefono
       },
 
       
    );
 }