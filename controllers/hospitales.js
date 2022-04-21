const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async ( req, res = response ) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
    });
};

const createHospital = async( req, res = response ) => {

    try {
        const hospital = new Hospital( req.body );
        hospital.usuario = req.idAuthenticatedUser;
        const newHospital = await hospital.save();

        res.json({
            ok: true,
            newHospital
        });
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

const updateHospital = async( req, res = response ) => {
    const hospitalId = req.params.id;
    const usuarioModifica = req.idAuthenticatedUser;
    try {

        const hospitalDB = await Hospital.findById( hospitalId );
        
        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id'
            });
        }

        const cambiosHospital = { ...req.body , usuario: usuarioModifica }
        //{ new:true} este parametro va a mostrar la actualización del hospital
        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, { new:true})

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Comuniquese con su administrador'
        });
    }
};

const deleteHospital = async ( req, res = response ) => {
    const hospitalId = req.params.id;
    
    try {
        const existHospital = await Hospital.findById( hospitalId );
        if ( !existHospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id'
            });
        }

        await Hospital.findByIdAndDelete( hospitalId );

        res.json({
            ok: true,
            msg: 'El hospital ha sido borrado de la base de datos'
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
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital,

}