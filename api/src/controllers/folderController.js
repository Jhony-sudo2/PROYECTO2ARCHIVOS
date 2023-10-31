const folderService = require('../services/folderService')

const getAllFolders = async(req,res) =>{
    const folders = await folderService.getAllFolders(req.body.user,req.body.path)
    res.send(folders)
}

const getShared = async(req,res)=>{
    const folders = await folderService.getShared(req.body.user)
    res.send(folders)
}

const createFolder = async(req,res) =>{
    await folderService.createFolder(req.body)
    res.status(200).json({message:'OK'})
}

const deleteFolder = async(req,res)=>{
    await folderService.deleteFolder(req.body.name,req.body.user,req.body.path)
    res.status(200).json({message:'OK'})
}

module.exports = {
    getAllFolders,
    createFolder,
    getShared,
    deleteFolder
}