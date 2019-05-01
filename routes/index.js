var express = require('express');
var router = express.Router();
var databaseUsuarios = require('./../databases/databaseUsuario');
var databaseSalas = require('./../databases/databaseSala');
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
router.get('/registroPeli', function(req,res){
  res.render('registroPeli',{title:'AluCine'});
});
//backUsuario
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
  
router.get('/backUsuarios/:pagina', async function(req, res, next) {
  var usu = await databaseUsuarios.verusus(req);
  res.render('backUsuarios',  { 
    usus: usu[0],
    pag: usu[1],
    paginas: usu[2],
    pagSig: usu[3],
    pagAnte: usu[4],
    busque: null
  } );
  });
router.get('/busquedaUsuarios/:pagina', async function(req,res){
  var usu = await databaseUsuarios.busquedaUsus(req);
res.render('backUsuarios',{ 
  usus: usu[0],
  pag: usu[1],
  paginas: usu[2],
  pagSig: usu[3],
  pagAnte: usu[4],
  busque: req.query.busqueda } );
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


//backSalas
router.get('/backSalas/:pagina',async function(req, res) {
  var salas = await databaseSalas.verSalas(req);
  res.render('backSalas',  { 
    salas: salas[0],
    pag: salas[1],
    paginas: salas[2],
    pagSig: salas[3],
    pagAnte: salas[4],
    busque: null
  } );
});
router.get('/busquedaSalas/:pagina',async function(req, res) {
  var salas = await databaseSalas.busquedaSalas(req);
  res.render('backSalas',  { 
    salas: salas[0],
    pag: salas[1],
    paginas: salas[2],
    pagSig: salas[3],
    pagAnte: salas[4],
    busque: req.query.busqueda
  } );
});


router.get('/registroSala', function(req, res) {
  res.render('formSala', { title: 'AluCine' });
});
router.post('/addSala',async function(req, res) {
  var salas = await databaseSalas.addSala(req);
  res.render('backSalas', {salas:salas});
});



module.exports = router;

