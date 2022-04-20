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

const updateHospital = ( req, res = response ) => {

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

const deleteHospital = ( req, res = response ) => {

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
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital,

}