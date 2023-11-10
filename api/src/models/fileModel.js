const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
    {
        name:String,
        content:String,
        path:String,
        user:String,
        user2:String,
        extension:String,
        fecha:String,
        padre:String,
        contador:Number
    }
)

const fileModel = mongoose.model('files',fileSchema);

module.exports = fileModel;