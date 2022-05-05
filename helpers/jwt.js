const jwt = require('jsonwebtoken');

const generarJWT = ( idUsuario ) => {
    // nombre:'daniel' esta ahi para comprobar que pueden haber mas campos
    const payload = { idUsuario, nombre:'daniel' }; 

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