const { response } = require("express");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");


const getBuscarTodo = async ( req, res = response) => {
    const searchParam = req.params.parameter;
    //Para que haga la busqueda de una cadena en la base de datos insencible a mayusculas y minusculas
    const regex = new RegExp( searchParam, "i" ); 

    /*const searchUser = await Usuario.find({ nombre: regex });
    const searchHospital = await Hospital.find({ nombre: regex });
    const searchDoctor = await Medico.find({ nombre: regex });*/

    const [ searchUser, searchDoctor, searchHospital ] = await Promise.all([
        //traigame todo los registros donde nombre sea igual a regex
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        searchUser,
        searchDoctor,
        searchHospital,
    });
};

const getBuscarPorColeccion = async ( req, res = response) => {
    const searchCollection = req.params.collection;
    const searchParam = req.params.parameter;
    const regex = new RegExp( searchParam, "i" ); 
    let result;
    switch (searchCollection) {
        case ('usuarios'):
            result = await Usuario.find({ nombre: regex });
            break;
    
        case ('medicos'):
            result = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
    
        case ('hospitales'):
            resiult = await Hospital.find({ nombre: regex}).populate('usuario', 'nombre img');
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla tine que ser usuarios/medicos/hospitales"
            });
    }

    res.json({
        ok: true,
        resultado: result
    });

}

module.exports = {
    getBuscarTodo,
    getBuscarPorColeccion
}