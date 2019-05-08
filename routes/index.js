var express = require('express');
var router = express.Router();
var databaseUsuarios = require('./../databases/databaseUsuario');
var databaseSalas = require('./../databases/databaseSala');
var databasePelis = require('./../databases/databasePelis');
var databasePromos = require('./../databases/databasePromos');
var databaseHorarios = require('./../databases/databaseHorarios');
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
  console.log('hola amigo '+req.session.nombre)
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
    //req.session.user = usu.email;
    console.log('hello '+req.session.user);
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
  res.render('estrenos', { title: 'AluCine' });
});


//backUsuario

router.get('/entradas', function(req, res, next) {
  res.render('entradas', { title: 'AluCine',nombre:req.session.nombre,apellidos:undefined  });
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

//HORARIOOOOSSSSSSSSSSSSSSSSSS
router.get('/registroHorario', function(req, res, next) {
  res.render('registroHorario', { title: 'AluCine' });
});
router.post('/addHorario', async function(req, res, next) {
  await databaseHorarios.addHorario(req);
  res.redirect('/backHorarios/1');
});
router.get('/backHorarios/:pagina',async function(req, res, next) {
  var horarios = await databaseHorarios.verHorarios(req);
  res.render('backHorarios',  { 
    horarios: horarios[0],
    pag: horarios[1],
    paginas: horarios[2],
    pagSig: horarios[3],
    pagAnte: horarios[4],
    busque: null
  } );
});
router.get('/busquedaHorarios/:pagina',async function(req, res) {
  var horarios = await databaseHorarios.busquedaHorarios(req);
  res.render('backHorarios',  { 
    horarios: horarios[0],
    pag: horarios[1],
    paginas: horarios[2],
    pagSig: horarios[3],
    pagAnte: horarios[4],
    busque: req.query.busqueda
  } );
});



//PELISSSSSS
router.get('/registroPelicula', function(req, res, next) {
  res.render('registroPeli', { title: 'AluCine' });
});

router.post('/addPeli', async function(req, res, next) {
  console.log(req.body.genero);
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
  console.log(horario)
  res.render('detallesPelicula', { title: 'AluCine' , pelicula:pelicula,nombre:req.session.nombre,apellidos:'',horarios:horario});
});

router.get('/registroPeli', function(req,res){
  res.render('registroPeli',{title:'AluCine'});
});

module.exports = router;

