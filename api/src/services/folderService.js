const fileModel = require('../models/fileModel');
const folderModel = require('../models/folderModel')
const fileService = require('../services/fileService')

async function getAllFolders(usuario,path2){
    const folders = await folderModel.find({path:path2,user:usuario});
    return folders;
}

async function actualizarContador(archivo){
    await folderModel.updateOne({path:archivo.path,name:archivo.name,user:archivo.user},{$set:{contador:archivo.contador}})
}
async function getPapelera(path2,identificador){
    let folders
    if(identificador != undefined){
        console.log('identificador: ' + identificador);
        folders = await folderModel.find({path:path2,padre:identificador})
    }else
        folders = await folderModel.find({path:path2})
    return folders
}

function copyFolder(archivo){
    const newarchivo = {name:archivo.name,path:archivo.path,user:archivo.user,extension:archivo.extension,fecha:archivo.fecha,contador:0}
    return newarchivo
}

async function copyFolders(archivo,path2,nombreOriginal){
    const archivo2 = copyFolder(archivo)
    await folderModel.insertMany(archivo2)
    let pathbusqueda
    let pathtmp 
    if(path2 == '/'){
        pathtmp = path2 + archivo.name
        pathbusqueda = path2 + nombreOriginal
    }
    else {
        pathtmp = path2 + '/'+archivo.name
        pathbusqueda = path2 +'/'+ nombreOriginal    
    }

    const archivos = await folderModel.find({path:pathbusqueda})
    const archivostxt = await fileModel.find({path:pathbusqueda})

    if(archivos.length !=0){
        archivos.forEach(async element=>{
            copyFolders(element,pathtmp,pathbusqueda)
        })
    }
    if(archivostxt.length !=0){
        archivostxt.forEach(async element=>{
           await fileService.copyFile(element,pathtmp)
        })
    }


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

async function changePadre(nombre,usuario,path2,padre2){
    await folderModel.updateOne({name:nombre,user:usuario,path:path2},{$set:{padre:padre2}})
}

async function moveFolder(archivo,newpath,tipo){
    let pathtmp 
    await changePath(archivo.name,archivo.user,archivo.path,newpath)
    let pathhijos
    if(newpath != '/')pathhijos = newpath + '/'+archivo.name
    else pathhijos = newpath + archivo.name

    if(archivo.path != '/')     pathtmp = archivo.path + '/' + archivo.name
    else     pathtmp = archivo.path + archivo.name
    

    const folders = await folderModel.find({path:pathtmp,user:archivo.user})
    const archivos = await fileService.getFile(archivo.user,pathtmp)

    if(folders.length !=0){
        folders.forEach(async element=>{
            if(tipo == 1) {
                await changePadre(element.name,element.user,element.path,archivo.id)
                moveFolder(element,pathhijos,1)
            }
                moveFolder(element,pathhijos,0)
        })
    }
    if(archivos.length != 0){
        archivos.forEach(async element=>{
            if(tipo == 1) {
                console.log('elemento 1');
                console.log(archivo.id);
                await fileService.deleteFile(element.user,element.name,element.path,pathhijos,archivo.id)
            }else
            await fileService.deleteFile(element.user,element.name,element.path,pathhijos)
        })
    }
}

async function deleteFolder(nombre,usuario,path2){
    console.log('eliminando');
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
    moveFolder,
    copyFolders,
    actualizarContador
}