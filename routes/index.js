var express = require('express');
var router = express.Router();
var databaseUsuarios = require('./../databases/databaseUsuario');
var databaseSalas = require('./../databases/databaseSala');
var databasePelis = require('./../databases/databasePelis');
var databasePromos = require('./../databases/databasePromos');
var databaseHorarios = require('./../databases/databaseHorarios');
var databaseEntradas = require('./../databases/databaseEntradas')
//importar models



/* GET home page. */
router.get('/', async function(req, res, next) {

  pelis = await databasePelis.verPelisF(); 

  res.render('index', { title: 'Express', pelis:pelis,nombre:req.session.nombre,apellidos:undefined });
});

router.get('/ap', function(req, res, next) {
  res.render('ap', { title: 'AluCine' });
});

router.get('/apIndex', function(req, res, next) {
  res.render('apIndex', { title: 'AluCine' });
});

router.get('/menu', function(req, res, next) {

  res.render('menu', { title: 'AluCine',nombre:req.session.nombre});
});

router.get('/inicioSesion', function(req, res, next) {  
  res.render('inicioSesion', { title: 'AluCine' });
});

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});

router.post('/iniSession', async function(req, res) {  
  var usu =  await databaseUsuarios.sessionUsu(req);
  if(usu.tipo == 'admin'){
    res.render('apIndex',{ title: 'AluCine' });
  }
  else if(usu.tipo == 'undefined'){
    res.render('ap', { title: 'AluCine', error: 'El usuario o contraseña no son validos' });
  }else{
    req.session.tipo = usu.tipo;
    res.render('index',{nombre:usu.nombre,apellidos:usu.apellidos});
  }
  
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'AluCine',contrasena:'' });

});

router.get('/cartelera', async function(req, res, next) {
  pelis = await databasePelis.verPelisF();
  res.render('cartelera', { title: 'AluCine', pelis:pelis,nombre:req.session.nombre,apellidos:undefined });
});

router.get('/estrenos', function(req, res, next) {
  res.render('estrenos', { title: 'AluCine',nombre:req.session.nombre });
});


//backUsuario

router.get('/entradas', async function(req, res, next) {
  var sesion = await databaseEntradas.getSesion(req);
  var ocupadas = await databaseEntradas.verEntradas(req);
  var filas = [];
  var columnas = [];
  
  for(i = 0;i<ocupadas.length;i++){
    filas[i] = ocupadas[i].fila;
    columnas[i] = ocupadas[i].butaca;
  }
  console.log(filas[0]+' '+columnas[0])
  res.render('entradas', { title: 'AluCine',nombre:req.session.nombre,apellidos:undefined, sesion:sesion,filas:filas,butacas:columnas });
});

router.get('/addEntradas', async function(req, res, next) {
var asiento = await databaseEntradas.verButaca(req);
//await databaseEntradas.addEntrada(req,asiento);
 res.send('has seleccionado la fila '+asiento[0]+' y la butaca '+asiento[1]+' para la pelicula '+asiento[2][1]+ ' a las '+asiento[3][1])
});

router.post('/addUsuario', async function(req, res, next) {
  
  contra1 = req.body.pass;
  contra2 = req.body.pass2;
  if(contra1 != contra2){
    
    res.render('registro', { title: 'AluCine',contrasena: 'La contraseña tiene que ser igual' });
  }else{
    await databaseUsuarios.addUsu(req);
  }
    res.redirect('/backUsuarios/1');
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
router.get('/borrarUsu/:id', async function(req,res){
  console.log(req.params.id);
  await databaseUsuarios.borrarUsu(req);
  res.redirect('/backUsuarios/1');
});
router.get('/editUsu/:id',async function(req,res) {
console.log(req.params.id);
  usu = await databaseUsuarios.busquedaUsu(req);
  res.render('editUsuario',{
    usu : usu
  });
});
router.post('/editUsuario', async function(req,res){
  usu = await databaseUsuarios.editUsu(req);
  res.redirect('/backUsuarios/1');
});


router.get('/backPromos', function(req, res, next) {
  res.render('backPromos', { title: 'AluCine' });
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
  res.render('registroSala', { title: 'AluCine' });
});
router.post('/addSala',async function(req, res) {
  var salas = await databaseSalas.addSala(req);
  res.redirect('/backSalas/1');

});
router.get('/borrarSala/:id', async function(req,res){
  console.log(req.params.id);
  await databaseSalas.borrarSala(req);
});

router.get('/editSala/:id',async function(req,res) {
console.log(req.params.id);
sala = await databaseSalas.datosSala(req);
  res.render('editSala',{
    sala : sala
  });
});
router.post('/editSala', async function(req,res){
  sala = await databaseSalas.editSala(req);
  res.redirect('/backSalas/1');
});






//PROMOSSSSS
router.get('/registroPromo', function(req, res) {
  res.render('registroPromo', { title: 'AluCine' });
});
router.post('/addPromo', async function(req, res, next) {
    await databasePromos.addPromo(req);
    res.redirect('/backPromos/1');
  });
router.get('/backPromos/:pagina',async function(req, res) {
  var promos = await databasePromos.verPromos(req);
  res.render('backPromos',  { 
    promos: promos[0],
    pag: promos[1],
    paginas: promos[2],
    pagSig: promos[3],
    pagAnte: promos[4],
    busque: null
  } );
});
router.get('/busquedaPromos/:pagina',async function(req, res) {
  var promos = await databasePromos.busquedaPromos(req);
  res.render('backPromos',  { 
    promos: promos[0],
    pag: promos[1],
    paginas: promos[2],
    pagSig: promos[3],
    pagAnte: promos[4],
    busque: req.query.busqueda
  } );
});

router.get('/borrarPromo/:id', async function(req,res){
  await databasePromos.borrarPromo(req);
  console.log("waka?")

});

router.get('/editPromo/:id',async function(req,res) {
console.log(req.params.id);
promo = await databasePromos.datosPromo(req);
  res.render('editPromocion',{
    promo : promo
  });
});

router.post('/editPromocion', async function(req,res){
  promo = await databasePromos.editPromo(req);
  res.redirect('/backPromos/1');
});

//HORARIOOOOSSSSSSSSSSSSSSSSSS
router.get('/registroHorario', async function(req, res, next) {
  pelis = await databasePelis.verPelisF();
  res.render('registroHorario', { title: 'AluCine' , pelis:pelis});
});

router.post('/addHorario', async function(req, res, next) {
  await databaseHorarios.addHorario(req);
  res.redirect('/backHorarios/1');
});

router.get('/backHorarios/:pagina',async function(req, res, next) {
  var horarios = await databaseHorarios.verHorarios(req);
  var pelis = await databasePelis.verPelisF(req);
  res.render('backHorarios',  { 
    horarios: horarios[0],
    pag: horarios[1],
    paginas: horarios[2],
    pagSig: horarios[3],
    pagAnte: horarios[4],
    busque: null,
    pelis:pelis
  } );
});

router.get('/busquedaHorarios/:pagina',async function(req, res) {
  var horarios = await databaseHorarios.busquedaHorarios(req);
  var pelis = await databasePelis.verPelisF(req);
  console.log("hola"+req.query.busqueda)
  res.render('backHorarios',  { 
    horarios: horarios[0],
    pag: horarios[1],
    paginas: horarios[2],
    pagSig: horarios[3],
    pagAnte: horarios[4],
    busque: req.query.busqueda,
    pelis:pelis
  } );
});



//PELISSSSSS
router.get('/registroPelicula', function(req, res, next) {
  res.render('registroPeli', { title: 'AluCine' });
});

router.post('/addPeli', async function(req, res, next) {
  await databasePelis.addPeli(req);
  res.redirect('/backPeliculas/1');
});

router.get('/backPeliculas/:pagina',async function(req, res) {
  var pelis = await databasePelis.verPelis(req);
  res.render('backPeliculas',  { 
    pelis: pelis[0],
    pag: pelis[1],
    paginas: pelis[2],
    pagSig: pelis[3],
    pagAnte: pelis[4],
    busque: null
  } );
});

router.get('/busquedaPeliculas/:pagina',async function(req, res) {
  var pelis = await databasePelis.busquedaPelis(req);
  res.render('backPeliculas',  { 
    pelis: pelis[0],
    pag: pelis[1],
    paginas: pelis[2],
    pagSig: pelis[3],
    pagAnte: pelis[4],
    busque: req.query.busqueda
  } );
});

router.get('/detallesPelicula/:id', async function(req, res, next) {
  var pelicula = await databasePelis.datosPeli(req);
  var horario = await databaseHorarios.verHorariosF(req,pelicula.id);
  res.render('detallesPelicula', { title: 'AluCine' , pelicula:pelicula,nombre:req.session.nombre,apellidos:'',horarios:horario});
});

router.get('/borrarPeli/:id', async function(req,res){
  console.log(req.params.id+"awuiju");
  await databasePelis.borrarPeli(req);
});
router.get('/editPeli/:id',async function(req,res) {
console.log(req.params.id);
peli = await databasePelis.datosPeli(req);
  res.render('editPelicula',{
    peli : peli
  });
});

router.post('/editPelicula', async function(req,res){
  peli = await databasePelis.editPeli(req);
  res.redirect('/backPeliculas/1');
});


router.get('/registroPeli', function(req,res){
  res.render('registroPeli',{title:'AluCine'});
});

router.get('/mantenimiento', function(req,res){
  res.render('mantenimiento',{title:'AluCine'});
});

module.exports = router;

