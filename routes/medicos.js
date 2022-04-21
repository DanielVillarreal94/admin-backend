const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get( '/', getMedicos );
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos
], createMedico );
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos
], updateMedico );
router.delete( '/:id', deleteMedico );


module.exports = router; 