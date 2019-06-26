var mongoose = require('mongoose');

var FacturaSchema = new mongoose.Schema({ 
    razonSocial: String,
    numero: String,
    fecha: Object,
    base: Number,
    tipo: Number,
    cobro: Object,
    contabilizado: String,
    fechaCont: Object
});

module.exports = mongoose.model('Factura', FacturaSchema);
