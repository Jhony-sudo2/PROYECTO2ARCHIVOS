const fileService = require('../services/fileService')

const getFilesByPath = async(req,res)=>{
    const files = await fileService.getFilesByPath(req)
    res.send(files)
}

const getFiles = async(req,res)=>{
    const file = await fileService.getFile(req.body.user,req.body.path)
    res.send(file);
}

const deleteFile = async(req,res)=>{
    console.log(req.body);
    await fileService.deleteFile(req.body.user,req.body.name,req.body.path)
    res.status(200).json({message:'OK'})
}

const createFile = async(req,res)=>{
    await fileService.createFile(req.body)
    res.status(200).json({message:'OK'})
}

const updateFile = async(req,res)=>{
    await fileService.updateFile(req.body)
    res.status(200).json({message:'OK'})
}




module.exports = {
    getFilesByPath,
    getFiles,
    deleteFile,
    createFile,
    updateFile
}