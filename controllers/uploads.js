const fs = require('fs');
const pathImportado = require('path');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarArchivoBD } = require("../helpers/actualizar-archivo");


const fileUpload = async (req, res = response) => {
    const tipo = req.params.type;
    const id = req.params.id;

    //Validar tipos 
    const tiposValidos = [ 'usuarios', 'medicos', 'hospitales' ];
    if( !tiposValidos.includes( tipo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha enviado ningun archivo'
        });
    }

    //Proscesar el archivo
    const file = req.files.archivo;
    const nombreCortado= file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //validar extension
    const extensionesValidas = [ 'jpg', 'png', 'jpeg', 'gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es unta extensión permitida'
        });
    }
    
    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar el archivo
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //Mover el archivo
    file.mv( path, (err) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });  
        }
    
        //Actualizar base de datos
        actualizarArchivoBD( tipo, id, nombreArchivo );
    
        res.json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
        });    
    });    
};

const verArchivo = ( req, res = response ) => {
    const { type, nombreArchivo } = req.params;
    
    const pathArchivo = pathImportado.join( __dirname, `../uploads/${ type }/${ nombreArchivo }`);
    //imagen por defecto
    if ( fs.existsSync( pathArchivo ) ) {
        res.sendFile( pathArchivo );
    } else {
        const pathArchivo = pathImportado.join( __dirname, '../uploads/noimage.jpg');
        res.sendFile( pathArchivo );
    }
}

module.exports = {
    fileUpload,
    verArchivo
}