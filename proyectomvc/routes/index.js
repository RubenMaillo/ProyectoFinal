var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'yass' });
  
});

router.get('/prueba', function(req, res, next) {
  res.render('prueba', { title: 'Nuevo formulario' });
});

//para renderizar una nueva vista.
//router.get('/<nombre en url>', function(req, res, next) {
//  res.render('<vista>', { <nombre de variable>: "<datos>" });
//});



module.exports = router;
