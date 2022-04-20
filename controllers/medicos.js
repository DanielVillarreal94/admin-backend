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

const updateMedico = ( req, res = response ) => {

    try {
        res.json({
            ok: true,
            msg: 'delete'
        });
        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

const deleteMedico = ( req, res = response ) => {


    try {
        res.json({
            ok: true,
            msg: 'delete'
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