const mongoose = require('mongoose');
const Usuario = require('./models/usuarios')

exports.initializeMongo = function(){
            mongoose.connect('mongodb://mongo/usuarioss',{useNewUrlParser:true})
            .then(() => console.log('WEEE!'))
            .catch(err => console.error('Eppa', err));
}

exports.verusus = async function(){
    const usus = await Usuario.findOne({dni:'45199304A'});
    console.log(usus)
    return usus;
 }
 exports.addUsu = async function(arrayUsu){
     const usu = new Usuario({
        dni:'45199304A',
        nombre:'ivan',
        apellidos:'branson',
        email:'ivanbranson48@gmail.com',
        password: '1234',
        tipo:'admin',
        alucineCard: true,
        puntos: 12345
     });
     const result = await usu.save();
     console.log(result);
 }
