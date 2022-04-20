const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospitales );
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createHospital );
router.put( '/:id', [],updateHospital );
router.delete( '/:id', deleteHospital );


module.exports = router;