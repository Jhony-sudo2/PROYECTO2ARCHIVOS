const folderModel = require('../models/folderModel')
const folderservice = require('../services/fileService')

async function getAllFolders(usuario,path2){
    const folders = await folderModel.find({path:path2,user:usuario});
    return folders;
}

async function getPapelera(path2){
    const folders = await folderModel.find({path:path2})
    return folders
}

async function getShared(usuario){
    
    const folders = await folderModel.find({path:'/shared',user:usuario});
    return folders
}

async function Folderexist(usuario,path,nombre){
    const folder = await folderModel.find({path:path,user:usuario,name:nombre})
    if(folder.length == 0)return true
    else return false
}

async function createFolder(newFolder){
    await folderModel.insertMany(newFolder)
}

async function changePath(nombre,usuario,path2,newpath){
    await folderModel.updateOne({name:nombre,user:usuario,path:path2},{$set:{path:newpath}})
}

async function moveFolder(archivo,newpath){
    const pathtmp = archivo.path + '/' + archivo.name
    await changePath(archivo.name,archivo.user,archivo.path,newpath)
    let pathhijos
    if(newpath != '/')
    pathhijos = newpath + '/'+archivo.name
    else
    pathhijos = newpath + archivo.name
    const folders = await folderModel.find({path:pathtmp,user:archivo.user})
    const archivos = await folderservice.getFile(archivo.user,pathtmp)

    if(folders.length !=0){
        folders.forEach(async element=>{
            moveFolder(element,pathhijos)
        })
    }
    if(archivos.length != 0){
        archivos.forEach(async element=>{
            await folderservice.deleteFile(element.user,element.name,element.path,pathhijos)
        })
    }


}

async function deleteFolder(nombre,usuario,path2){
    let pathtmp
    if(path2 == '/')
    pathtmp = path2 + nombre
    else pathtmp = path2 + '/'+nombre
    let newpath = '/papelera' + pathtmp
    //Primer paso cambiar el path al principal
    await changePath(nombre,usuario,path2,'/papelera')

    //segundo paso verificar el cambio en los archivos que tenga adentro
    let folders = await folderModel.find({path:pathtmp,user:usuario})
    let archivos = await folderservice.getFile(usuario,pathtmp)

    if(folders.length != 0){
        folders.forEach(async element => {
            const pathanterior = element.path
            await changePath(element.name,element.user,element.path,newpath)
            deleteFolder(element.name,usuario,pathanterior)
        });   
    }
    if(archivos.length != 0){
        archivos.forEach(async element =>{
            await folderservice.deleteFile(element.usuario,element.name,element.path,newpath)
        })
    }
}

module.exports = {
    getAllFolders,
    createFolder,
    getShared,
    deleteFolder,
    Folderexist,
    getPapelera,
    moveFolder
}