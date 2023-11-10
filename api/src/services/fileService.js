const fileModel  = require('../models/fileModel')
const userservice = require('../services/userservice')
const folderModel = require('../models/folderModel')

async function getFile(usuario,path2){
    const file = await fileModel.find({user:usuario,path:path2})
    return file;
}

async function eliminar(archivo){
    await fileModel.deleteOne({user:archivo.user,user2:archivo.user2,name:archivo.name,path:archivo.path})
}

async function shareFile(archivo){
    if(await userservice.userexist(archivo.user2) == false){
        archivo.path = '/compartido'
        await fileModel.insertMany(archivo)
        return true
    }else return false

}

async function moveFile(archivo,newPath){
    await fileModel.updateOne({user:archivo.user,path:archivo.path,name:archivo.name},{$set:{path:newPath}})
}

async function getShareFiles(usuario){
    const archivos = fileModel.find({user2:usuario,path:'/compartido'})
    return archivos
}

async function deleteFile(usuario,nombre,path2,newpath,padre2){
    console.log('cambiando path');
    await fileModel.updateOne({user:usuario,name:nombre,path:path2},{$set:{path:newpath,padre:padre2}})
}

async function getPapelera(path2){
    const archivos = await fileModel.find({path:path2})
    return archivos
}

async function Filexist(usuario,nombre,path2){
    const filee = await fileModel.find({user:usuario,name:nombre,path:path2})
    const carpeta = await folderModel.find({user:usuario,name:nombre,path:path2})
    console.log('file: ' + filee);
    if(filee.length == 0 && carpeta.length == 0) return true
    else return false
}

async function createFile(archivo){
    await fileModel.insertMany(archivo)
}

async function updateFile(archivo){
    await fileModel.updateOne({_id:archivo._id},{ $set: { content: archivo.content } } )   
}

async function copyFile(archivo,path2){
    const archivotmp = {name:archivo.name,user:archivo.user,path:path2,extension:archivo.extension,content:archivo.content,fecha:archivo.fecha}
    await fileModel.insertMany(archivotmp)
}   

module.exports = {
    getFile,
    deleteFile,
    createFile,
    updateFile,
    Filexist,
    getPapelera,
    shareFile,
    getShareFiles,
    moveFile,
    eliminar,
    copyFile
}