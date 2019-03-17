const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// google vars
const { OAuth2Client } = require('google-auth-library');

const Usuario = require('../models/usuario');
const app = express();

// ========================================
// login normal
// ========================================
app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario incorrecto.'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario incorrecto.'
                }
            });
        }
        let token = jwt.sign({ usuario: usuarioBD }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token
        });
    });
});

// ========================================
// login google
// ========================================

// configuracion de google
async function verify(token) { // jshint ignore:line
    const ticket = await client.verifyIdToken({ // jshint ignore:line
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}
app.post('/google', (req, res) => {

    var token = req.body.idtoken;
    const client = new OAuth2Client(process.env.CLIENT_ID, process.env.GOOGLE_SECRET);
    const ticket = client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    ticket.then(data => {
        Usuario.findOne({ email: data.payload.email }, (err, usuarioBD) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuario de BBDD',
                    errors: err
                });
            }
            if (usuarioBD) {
                if (usuarioBD.google === false) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Debe usar autenticación normal',
                        errors: err
                    });
                } else {
                    var token = jwt.sign({ usuario: usuarioBD }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                    res.status(200).json({
                        ok: true,
                        usuario: usuarioBD,
                        token: token
                    });
                }

            } else {
                // el usuario no existe hay que crearlo
                var usuario = new Usuario();
                usuario.nombre = data.payload.name;
                usuario.email = data.payload.email;
                usuario.img = data.payload.picture;
                usuario.password = ':)';
                usuario.google = true;

                usuario.save((err, usuarioBD) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error guardando usuario de BBDD',
                            errors: err
                        });
                    }
                    var token = jwt.sign({ usuario: usuarioBD }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                    res.status(200).json({
                        ok: true,
                        usuario: usuarioBD,
                        token: token
                    });
                });

            }
        });
    }).catch(err => {
        if (err) {
            return res.status(403).json({
                ok: false,
                mensaje: 'Invalid Token',
                errors: err
            });
        }
    });
});

module.exports = app;