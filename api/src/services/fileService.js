const fileModel  = require('../models/fileModel')


async function getOneFile(usuario,path2,nombre){
    const file = await fileModel.find({user:usuario,path:path2,name:nombre})
    return file
}

async function getFile(usuario,path2){
    const file = fileModel.find({user:usuario,path:path2})
    return file;
}

async function deleteFile(usuario,nombre,path2){
    console.log('eliminado: ' + usuario + nombre);
    await fileModel.deleteOne({user:usuario,name:nombre,path:path2})
}

async function createFile(archivo){
    await fileModel.insertMany(archivo)
}

async function updateFile(archivo){
    await fileModel.updateOne({_id:archivo._id},{ $set: { content: archivo.content } } )
    
}

module.exports = {
    getFile,
    deleteFile,
    createFile,
    updateFile
}