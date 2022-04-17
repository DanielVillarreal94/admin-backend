const { response } = require("express");
const Usuario = require('../models/usuario')

//Para encriptar las contraseñas hay que que instalar 'bcryptjs'
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require("../helpers/jwt");

const login = async ( req, res = response ) => {
    const { email, password } = req.body;
    try {
        //Verifica el email
        const userDB = await Usuario.findOne({ email });
        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado el email"
            });
        }

        //Verifica el contraseña
        const existPassword = await bcrypt.compareSync( password, userDB.password );
        if( !existPassword ) {
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado el password"
            });
        }

        //Generar el TOKEN - JWT 
        const token = await generarJWT( userDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
    
};


module.exports = {
    login
};