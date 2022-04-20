const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, verArchivo } = require('../controllers/uploads');
//Middleware obligatorio para subir archivos
const expressFileUpload = require('express-fileupload');

const router = new Router();
router.use(expressFileUpload());

router.put('/:type/:id',validarJWT, fileUpload );
router.get('/:type/:nombreArchivo',validarJWT, verArchivo );


module.exports = router;