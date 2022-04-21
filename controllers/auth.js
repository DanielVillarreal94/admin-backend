const { response } = require("express");
const Usuario = require('../models/usuario')

//Para encriptar las contraseñas hay que que instalar 'bcryptjs'
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const loginGoogle = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify( googleToken );  
        const userDB = await Usuario.findOne({ email });
        let usuario;

        if( !userDB ){
            //no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google: true
            });    
        } else {
            usuario = userDB;
            usuario.google = true;
            //usuario.password ='@@@'; se comento esta linea para que pueda logearse tanto con contraseña como con google
        }

        //Guardar en DB
        usuario.save();

        //Generar el TOKEN - JWT 
        const token = await generarJWT( usuario.id );

        res.json({
                ok: true,
                token
            });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'El Token no es correcto, comuniquese con su administrador. '
        });
    }
}


module.exports = {
    login,
    loginGoogle
};