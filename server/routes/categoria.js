const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categoria');
// ========================================
// obtener las categorias
// ========================================
app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .limit(limite)
        .skip(desde)
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Categoria.count((err, total) => {
                res.status(200).json({
                    ok: true,
                    categorias,
                    total
                });
            });
        });
});

// ========================================
// obtener categoria por id
// ========================================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'no existe la categoria buscada'
                }
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaBD
        });
    });
});

// ========================================
// crear una categoria
// ========================================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaBD
        });
    });
});

// ========================================
// actualizar la categoria por id
// ========================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        descripcion: body.descripcion
    };
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaBD
        });
    });
});

// ========================================
// borrar la categoria por id
// ========================================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndDelete(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no existe la categoria en la BBDD'
                }
            });
        }
        res.status(200).json({
            ok: true,
            message: 'categoria borrada'
        });
    });
});

module.exports = app;