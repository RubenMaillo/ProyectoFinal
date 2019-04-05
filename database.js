const mongoose = require('mongoose');
var Usuario = require('./models/usuarios')

exports.initializeMongo = function(){
            mongoose.connect('mongodb://mongo/usuarioss',{useNewUrlParser:true})
            .then(() => console.log('WEEE!'))
            .catch(err => console.error('Eppa', err));
}

exports.verusus = async function(){
    const usus = await Usuario.findOne({dni:'74854841E'});
    console.log(usus)
    return usus;
 }