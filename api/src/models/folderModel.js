const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema(
    {
        name:String,
        path:String,
        user:String,
        extension:String,
        fecha:String,
        padre:String
    }
)

const folders = mongoose.model('folders',folderSchema);

module.exports = folders;