const folderModel = require('../models/folderModel')

async function getAllFolders(usuario,path2){
    const folders = await folderModel.find({path:path2,user:usuario});
    return folders;
}

async function getShared(usuario){
    
    const folders = await folderModel.find({path:'/shared',user:usuario});
    return folders
}

async function createFolder(newFolder){
    await folderModel.insertMany(newFolder)
}

async function deleteFolder(nombre,usuario,path2){
    console.log('eliminado folder ' + nombre + "  " + usuario);
    await folderModel.deleteOne({user:usuario,name:nombre,path:path2})
}

module.exports = {
    getAllFolders,
    createFolder,
    getShared,
    deleteFolder
}