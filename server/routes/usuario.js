const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

app.get('/usuario', function(req, res) {
    res.json('get usuario');
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioBD.password = ':)'; // para evitar que se vea en la peticion, esto no afecta a la BBDD
        res.status(200).json({
            ok: true,
            usuario: usuarioBD
        });
    });
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); // para indicar que es lo que puedo actualizar
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBD
        });

    });
})

app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
})

module.exports = app;