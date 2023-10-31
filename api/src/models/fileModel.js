const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
    {
        name:String,
        content:String,
        path:String,
        user:String,
        extension:String,
        fecha:Date
    }
)

const fileModel = mongoose.model('files',fileSchema);

module.exports = fileModel;