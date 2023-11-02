const fileModel  = require('../models/fileModel')



async function getFile(usuario,path2){
    const file = await fileModel.find({user:usuario,path:path2})
    return file;
}

async function deleteFile(usuario,nombre,path2,newpath){
    await fileModel.updateOne({user:usuario,name:nombre,path:path2},{$set:{path:newpath}})
}

async function getPapelera(path2){
    const archivos = await fileModel.find({path:path2})
    return archivos
}

async function Filexist(usuario,nombre,path2){
    const filee = await fileModel.find({user:usuario,name:nombre,path:path2})
    console.log('file: ' + filee);
    if(filee.length == 0) return true
    else return false
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
    updateFile,
    Filexist,
    getPapelera
}