const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });
};

const createMedico = async ( req, res = response ) => {
    const usuario = req.idAuthenticatedUser;
    try {
        const medico = new Medico( {usuario, ...req.body} );
        const newMedico = await medico.save();

        res.json({
            ok: true,
            medico: newMedico
        });
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

const updateMedico = async( req, res = response ) => {

    const medicoId = req.params.id;
    const usuarioModifica = req.idAuthenticatedUser;
    try {

        const medicoDB = await Medico.findById( medicoId );
        
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            });
        }

        const cambiosMedico = { ...req.body , usuario: usuarioModifica }
        //{ new:true} este parametro va a mostrar la actualización del medico
        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new:true})

        res.json({
            ok: true,
            medico:medicoActualizado
        });
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({ 
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

const deleteMedico = async( req, res = response ) => {
    const medicoId = req.params.id;
    
    try {
        const existMedico = await Medico.findById( medicoId );
        if ( !existMedico ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            });
        }

        await Medico.findByIdAndDelete( medicoId );

        res.json({
            ok: true,
            msg: 'El medico ha sido borrado de la base de datos'
        });
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

module.exports ={
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,

}