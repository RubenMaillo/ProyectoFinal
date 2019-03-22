var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ap', function(req, res, next) {
  res.render('ap', { title: 'AluCine' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'AluCine' });
});

router.get('/inicioSesion', function(req, res, next) {
  res.render('ap', { title: 'AluCine' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'AluCine' });
});

module.exports = router;
