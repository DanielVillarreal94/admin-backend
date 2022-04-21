/**
 * /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/',[
    check( 'password', 'El password es obligatorio').not().isEmpty(),
    check( 'email', 'El email es obligatorio').not().isEmpty(),
    check( 'email', 'El email no es valido').isEmail(),
    validarCampos
], login);

//Sesión de google
router.post('/google',[
    check( 'token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], loginGoogle);


module.exports = router;