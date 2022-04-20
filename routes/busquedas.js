const { Router } = require('express');
const { getBuscarTodo, getBuscarPorColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = new Router();

router.get('/:parameter',validarJWT, getBuscarTodo);
router.get('/coleccion/:collection/:parameter',validarJWT, getBuscarPorColeccion);


module.exports = router;