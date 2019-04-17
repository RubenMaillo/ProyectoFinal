const mongoose = require('mongoose');

exports.initializeMongo = function(){
    mongoose.connect('mongodb://mongo/alucine',{useNewUrlParser:true})
    .then(() => console.log('WEEE!'))
    .catch(err => console.error('Eppa', err));
}
