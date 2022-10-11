const { unlink } = require('fs-extra');
const { format } = require('path');
const path = require('path');

const cloudinary = require('../config/config-cloudinary');
const Image = require('../models/image');

const objImageCtrl = {}

objImageCtrl.renderIndex = (req, res) => {
    res.render('index');
}

objImageCtrl.listAllimages = async (req, res) => {

    //Consultamos todas las imagenes
    const images = await Image.find();
    res.render('images/total-images', { images });

}

objImageCtrl.renderFormUpload = (req, res) => {
    res.render('images/upload-images');
}

objImageCtrl.uploadImage = async (req,res) => {
    
    const {title, description} = req.body;
    console.log(req.file);
    const {filename, originalname, mimetype, size} = req.file;

    //Subimos la imagen a cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const image = new Image({
        title,
        description,
        filename,
        imageURL: result.url,
        originalname,
        mimetype,
        size,
        public_id: result.public_id
    });
    
    await image.save();
    await unlink(req.file.path);
    res.redirect('/images');
}

objImageCtrl.perfilImage = async (req, res) => {
    const {id} = req.params;
    const image = await Image.findById(id);
    const fechaCreacion = new Date(image.createdAt);
    const tiempo = `${fechaCreacion.getDay()}-${fechaCreacion.getMonth()}-${fechaCreacion.getFullYear()}`;
    res.render('images/profile-image', {image, tiempo});
}

objImageCtrl.deleteImage = async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id); //devuelve la imagen eliminada
    await cloudinary.v2.uploader.destroy(image.public_id);
    res.redirect('/images');
}

module.exports = objImageCtrl;