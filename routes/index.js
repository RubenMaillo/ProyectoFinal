var express = require('express');
var router = express.Router();
var databaseUsuarios = require('./../databases/databaseUsuario')
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

router.post('/iniSession', async function(req, res) {  
  var usu =  await databaseUsuarios.sessionUsu(req);
  res.send(usu.nombre+'<br>'+usu.apellidos);
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

router.post('/addUsuario', async function(req, res, next) {
  
  contra1 = req.body.pass;
  contra2 = req.body.pass2;
  if(contra1 != contra2){
    res.send("La contraseña tiene que ser igual");
  }else{
    await databaseUsuarios.addUsu(req);
  }
    res.redirect('/');
  });
  
router.get('/backUsuarios', async function(req, res, next) {
  var usus = await databaseUsuarios.verusus()
  usus.forEach(function(usu){
    console.log(usu['dni']);
  });
    res.render('backUsuarios',  { usus: usus } );
  });


router.post('/busquedaUsuarios', async function(req,res){
  var usus = await databaseUsuarios.busquedaUsus(req);
res.render('backUsuarios',  {  title: 'AluCine' } );
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
