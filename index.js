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

// Lectura y parseo del body
app.use( express.json() );

// // Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/busquedas', require('./routes/busquedas'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/upload', require('./routes/uploads'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});