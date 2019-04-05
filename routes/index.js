var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ap', function(req, res, next) {
  res.render('ap', { title: 'AluCine' });
});

router.get('/apIndex', function(req, res, next) {
  res.render('apIndex', { title: 'AluCine' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'AluCine' });
});

router.get('/inicioSesion', function(req, res, next) {
  res.render('inicioSesion', { title: 'AluCine' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'AluCine' });
});

router.get('/cartelera', function(req, res, next) {
  res.render('cartelera', { title: 'AluCine' });
});

router.get('/detallesPelicula', function(req, res, next) {
  res.render('detallesPelicula', { title: 'AluCine' });
});

router.get('/promos', function(req, res, next) {
  res.render('promos', { title: 'AluCine' });
});

/*router.get('/backUsuarios', function(req, res, next) {
  res.render('backUsuarios', { title: 'AluCine' });
});*/

router.get('/backPeliculas', function(req, res, next) {
  res.render('backPeliculas', { title: 'AluCine' });
});

router.get('/backPromos', function(req, res, next) {
  res.render('backPromos', { title: 'AluCine' });
});

router.get('/backHorarios', function(req, res, next) {
  res.render('backHorarios', { title: 'AluCine' });
});

router.get('/backSalas', function(req, res, next) {
  res.render('backSalas', { title: 'AluCine' });
});

router.get('/mantenimiento', function(req, res, next) {
  res.render('mantenimiento', { title: 'AluCine' });
});







router.get('/backUsuarios', function(req, res, next) {

  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost/usuarios',{useNewUrlParser:true})
      .then(() => 'WEEE!')
      .catch(err => console.error('Eppa', err));
  
  var nomb = "Rubeno";
  async function guardarUsu(){
      const usu = new Usuario({
      nombre: nomb,
      apellidos:"El Moreno",
      edad:44,
      ciudad:["poralli","poraqui"]
  });
  const result = await usu.save();
  }
  guardarUsu();
  
  async function verusus(){
    const usus = Usuario.find();
    return usus;
  }
   usus = verusus();
   console.log(usus);
    res.render('backUsuarios', { usus });
  });
module.exports = router;
