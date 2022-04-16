// Llamar al archivo .env (previamente hay que instalar el paquete npm i dotenv) 
require('dotenv').config();

const express = require('express');
// Llamar los cors
const cors = require('cors');

//Conexión a la base de datos
const { dbConection } = require('./database/config');
dbConection();

//Crear servidor de express
const app = express();

//Configurar CORS
app.use(cors());

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok:true,
        msg: 'Hola mundo'
    });
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});