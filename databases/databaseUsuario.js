const Usuario = require('../models/usuarios');

exports.verusus = async function(req){
   var limitPag = 10;
   var pag = req.params.pagina;
   var cuenta = await Usuario.find().countDocuments();
   var usus = await Usuario.find()
   .skip((limitPag * pag) - limitPag)
   .limit(limitPag);
   var v1 = usus;
   var v2 = pag;
   var v3 = Math.ceil(cuenta/limitPag);
   var v4 = Number(pag)+1;
   var v5 = Number(pag)-1;
   var datos = [v1,v2,v3,v4,v5];
   return datos;
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
    req.session.user = usu[0].email;
    req.session.nombre = usu[0].nombre;
    return usu[0];
    
 }
 exports.busquedaUsu = async function(req){
    var usu = await Usuario.findOne({
       _id:req.params.id
    });
    return usu;
 }
 exports.busquedaUsus = async function(req){
   var busq = req.query.busqueda;
   var limitPag = 10;
   var pag = req.params.pagina;
   var cuenta = await Usuario.find({
      $or:[
      {email:{$regex:busq,$options:"$i"}},
      {dni:{$regex:busq,$options:"$i"}},
      {nombre:{$regex:busq,$options:"$i"}},
      {apellidos:{$regex:busq,$options:"$i"}}]
   }).countDocuments();
   var usus = await Usuario.find({
      $or:[
      {email:{$regex:busq,$options:"$i"}},
      {dni:{$regex:busq,$options:"$i"}},
      {nombre:{$regex:busq,$options:"$i"}},
      {apellidos:{$regex:busq,$options:"$i"}}]
   })
   .skip((limitPag * pag) - limitPag)
   .limit(limitPag)
   var v1 = usus;
   var v2 = pag;
   var v3 = Math.ceil(cuenta/limitPag);
   var v4 = Number(pag)+1;
   var v5 = Number(pag)-1;
   var datos = [v1,v2,v3,v4,v5];
   return datos;
 }
 exports.borrarUsu = async function(req){
   var id = req.params.id;
   console.log(id);
   var resp = await Usuario.deleteOne({_id:id});
   console.log(resp);
   return resp;
 }
exports.editUsu = async function(req){
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