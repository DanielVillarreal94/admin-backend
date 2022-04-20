const fs = require('fs'); //Se puede leer las carpetas y los archivos

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarArchivoBD = async ( tipo, id, nombreArchivo ) => {

    let pathViejo;
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if( !usuario ) { 
                console.log('No existe usuario con esa identificación');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            if( fs.existsSync( pathViejo ) ) {
                //borrar el archivo
                fs.unlinkSync( pathViejo );
            }

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
            break;
    
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if( !hospital ) { 
                console.log('No existe hospital con esa identificación');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            if( fs.existsSync( pathViejo ) ) {
                //borrar el archivo
                fs.unlinkSync( pathViejo );
            }

            hospital.img = nombreArchivo;

            await hospital.save();
            return true;
            break;
    
        case 'medicos':
            
            const medico = await Medico.findById( id );
            if( !medico ) { 
                console.log('No existe medico con esa identificación');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            if( fs.existsSync( pathViejo ) ) {
                //borrar el archivo
                fs.unlinkSync( pathViejo );
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
    }
}

module.exports = {
    actualizarArchivoBD
}