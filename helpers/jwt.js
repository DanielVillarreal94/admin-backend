const jwt = require('jsonwebtoken');

const generarJWT = ( idUsuario ) => {
    const payload = { idUsuario, nombre:'daniel' }; // nombre:'daniel' esta ahi para comprobar que pueden haber mas campos

    return new Promise( ( resolve, reject ) => {
        jwt.sign( 
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '12h' },
            ( err, token ) => {
                if (err) {
                    console.log(err);
                    reject('No se puede generar el JWT');
                } else {
                    resolve( token );
                }
            } 
        );
    } );    
};

module.exports = {
    generarJWT
}