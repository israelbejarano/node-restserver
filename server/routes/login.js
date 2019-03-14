const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    res.status(200).json({
        ok: true
    });
});

module.exports = app;