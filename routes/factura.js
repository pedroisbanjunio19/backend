var express = require('express');
var Factura = require('../models/factura.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Factura.find({}).exec((err, facturas)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            facturas: facturas
        });
    });
});

app.get('/:id', function(req, res, next){
    Factura.findById(req.params.id, (err, factura)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            factura: factura
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var factura = new Factura({
        razonSocial: body.razonSocial,
        numero: body.numero,
        fecha: body.fecha,
        base: body.base,
        tipo: body.tipo,
        // cobro: body.cobro,
        contabilizado: body.contabilizado,
        // fechaCont: body.fechaCont
    });
    factura.save((err, facturaGuardada)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear factura',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            factura: facturaGuardada
        });
    }); 
});

app.put('/:id', function(req, res, next){
    Factura.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err); 
        res.json({ 
            ok: 'true',
            mensaje: 'Factura actualizada'
        });
    });
});

app.delete('/:id', function(req, res, error){
    Factura.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        res.status(200).json({
            ok: 'true',
            mensaje: 'Factura eliminada'
        });
    });

});

module.exports = app;
