const jwt = require('jsonwebtoken');

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
        req.idAuthenticatedUser = idUsuario;
        next();
        
    } catch (error) {
        console.log( error );
        return res.status(401).json( {
            ok: false,
            msg: 'Token no valido'
        } );
    }
};

module.exports = {
    validarJWT
};