const { Router } = require('express');
const router = Router();

const {renderIndex,listAllimages,renderFormUpload, uploadImage, perfilImage, deleteImage} = require('../controllers/image-controller');

//muestra página de inicio
router.get('/',  renderIndex);

//muestra todas las imagenes
router.get('/images', listAllimages);

//Muestra el formulario para subir imagen
router.get('/upload', renderFormUpload);

//Recibe los datos de la imagen
router.post('/upload', uploadImage);

//mostrar perfil de la imagen
router.get('/image/:id', perfilImage);

//Eliminar imagen
router.get('/image/:id/delete', deleteImage);

module.exports = router;