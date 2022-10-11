const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: {type: String},
    description:{type: String},
    filename: {type: String},
    imageURL: {type:String},
    originalname: {type:String},
    mimetype: {type:String},
    size: {type:Number},
    public_id: {type:String}
},{timestamps:true});

module.exports = model('Image', imageSchema);