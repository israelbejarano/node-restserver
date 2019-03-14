require('./config/config');
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose'); // moongose
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// importar rutas
// var usuarioRoutes = require('./routes/usuario');

// rutas
//app.use('/usuario', usuarioRoutes);

app.use(require('./routes/usuario'));

// Conexion a BBDD
mongoose.connect(process.env.URLBD, { useNewUrlParser: true, useCreateIndex: true }, // cadena de conexion para mongo resuelve deprecateds
    (err, res) => {
        if (err) throw err;
        console.log('BBDD en puerto 27017:', ' online'.bgGreen);
    });

app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`.bgGreen);
})