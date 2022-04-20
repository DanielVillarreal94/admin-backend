const { response } = require('express');

//Para encriptar las contraseñas hay que que instalar 'bcryptjs'
const bcrypt = require('bcryptjs'); 

const Usuario = require('../models/usuario')

const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
    const desde = Number( req.query.desde ) || 0;
    const cantidad = Number( req.query.cantidad ) || 10;
    
    //Primise.all() se la utiliza para ejecutar en bloque diferentes 
    //funciones que se necesita el valor para la ejecucion del siguiente codigo (async-await)
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
            .skip( desde )
            .limit( cantidad ),
        Usuario.count()
    ]);

    
    res.json({
        ok: true,
        usuarios,
        total
        //id: req.idAuthenticatedUser //se puede utlizar porque en el middleware validar-jwt se le asigna este atributo

    });
}

const createUsuario = async (req, res = response ) => {
    
        const { nombre, email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();//Genera un num al azar
        usuario.password = bcrypt.hashSync( password, salt );
        await usuario.save();
        
        //Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const updateUsuario = async ( req, res = response ) => {
    const uid = req.params.id
    try {
        const existUsuario = await Usuario.findById( uid );
        
        if ( !existUsuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Actualizar
        const { password, google, email, ...paramsUsuario } = req.body;

        if ( existUsuario.email !== email ) {
            const existEmail = await Usuario.findOne({ email });
            if ( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este correo: ' + req.body.email
                });
            }
        }

        //Se elimina datos que llegan en el request
        // delete paramsUsuario.password; 
        // delete paramsUsuario.google; 
        paramsUsuario.email = email;
        const usuarioActualido = await Usuario.findByIdAndUpdate( uid, paramsUsuario, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualido
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const deleteUsuario = async ( req, res = response ) => {
    const idUser = req.params.id;
    try {
        const existUsuario = await Usuario.findById( idUser );
        if( !existUsuario ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( idUser );

        res.json({
            ok: true,
            msg: 'Usuario borrado correctamente'
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({ 
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};


//metodo para crear usarios se debe tener en cuenta los if del crearUsuario
/*const r = function(res = response){
    let req ={ body: {
        nombre: '', 
        email:'', 
        password: '',
        role: '',
    }}
    for (let i = 1; i < 51; i++) {
       req.body.nombre = 'test'+[i]; 
       req.body.email = `test${i}@gmail.com`; 
       req.body.password = '123456'; 
       req.body.role = 'USER_ROLE'; 
        createUsuario(req,res);
    }

}*/