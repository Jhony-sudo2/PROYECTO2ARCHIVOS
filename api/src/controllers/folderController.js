const folderService = require('../services/folderService')
const fileService = require('../services/fileService')
const getAllFolders = async(req,res) =>{
    const archivo = req.body
    const folders = await folderService.getAllFolders(archivo.user,archivo.path,archivo._id)
    res.send(folders)
}

const getShared = async(req,res)=>{
    const folders = await folderService.getShared(req.body.user)
    res.send(folders)
}

const copyFolder = async(req,res)=>{
    const archivo = req.body
    const nameoriginal = archivo.name
    archivo.contador +=1;
    await folderService.actualizarContador(archivo)
    archivo.name = archivo.name + '(' + archivo.contador +")"
    await folderService.copyFolders(archivo,archivo.path,nameoriginal)
    res.status(200).json({message:'OK'})
}

const createFolder = async(req,res) =>{
    if(await fileService.Filexist(req.body.user,req.body.name,req.body.path) == true){
        await folderService.createFolder(req.body)
        res.status(200).json({message:'OK'})
    }else{
        res.status(409).json({message:'CONFLICT'})
    }
}

const moveFolder = async(req,res)=>{
    await folderService.moveFolder(req.body.archivo,req.body.newpath,0)
    res.status(200).json({message:'OK'})
}

const deleteFolder = async(req,res)=>{
    //await folderService.deleteFolder(req.body.name,req.body.user,req.body.path)
    await folderService.moveFolder(req.body,'papelera',1)
    res.status(200).json({message:'OK'})
}

const getpapelera = async (req,res)=>{
    const folders = await folderService.getPapelera(req.body.path,req.body.id)
    res.send(folders)
}

module.exports = {
    getAllFolders,
    createFolder,
    getShared,
    deleteFolder,
    getpapelera,
    moveFolder,
    copyFolder
}