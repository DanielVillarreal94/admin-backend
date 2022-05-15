const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = ( req, res, next ) => {
    //Leer el token
    const token = req.header('x-token');
    if ( !token ) {
        res.status( 401 ).json( { 
            ok: false,
            msg: 'No hay token en la petición'
        } );
    }

    try {
        const { idUsuario } = jwt.verify( token, process.env.JWT_SECRET); //idUsuario se lo obtiene del helper jwt.js
        req.idAuthenticatedUser = idUsuario; // Parámetro que se establece en todo el req(request)
        next();
        
    } catch (error) {
        console.log( error );
        return res.status(401).json( {
            ok: false,
            msg: 'Token no valido'
        } );
    }
};

const validarADMIN_ROLE = (req, res, next) =>{
    const idUsuario = req.idAuthenticatedUser
    try {
        const usuario = Usuario.findById(idUsuario);
        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if ( usuario.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No cuenta con permisos de administrador'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Comuniquese con el administrador'
        });
    }
}

const validarADMIN_ROLE_o_MismoUsuario = (req, res, next) =>{
    const idUsuario = req.idAuthenticatedUser
    try {
        const usuario = Usuario.findById(idUsuario);
        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuario.role === 'ADMIN_ROLE' || req.params.id === idUsuario ) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No cuenta con permisos de administrador'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Comuniquese con el administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
};