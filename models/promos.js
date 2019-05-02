var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var promoSchema = new Schema({
    tipoPromo: {type: [String],required:[true,'Tipo obligatorio']},
    descripcion: { type: String, required: [true, 'La decripcion es obligatoria'] },
    descuento: { type: Number, required: [true, 'El descuento es obligatorio'] }
});

var Promo = mongoose.model('promo', promoSchema);
module.exports = Promo;
