var express = require('express');
var router = express.Router();
var database = require('./../database');
//importar models



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

router.get('/backUsuarios', async function(req, res, next) {
 
  var usus = await database.verusus()
   console.log(usus);
    res.render('backUsuarios',  { usus: usus } );
  });

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

module.exports = router;
