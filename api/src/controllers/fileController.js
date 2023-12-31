const fileService = require('../services/fileService')

const getFilesByPath = async (req, res) => {
    const files = await fileService.getFilesByPath(req)
    res.send(files)
}

const copyFile = async(req,res)=>{

    const archivo = req.body
    archivo.contador = archivo.contador + 1
    await fileService.actualizarcontador(archivo,archivo.contador)
    archivo.name = archivo.name + '(' + archivo.contador + ")"
    await fileService.copyFile(archivo,archivo.path)
    return res.status(200).json({message:'OK'})
}

const moveFile = async(req,res)=>{
    await fileService.moveFile(req.body.archivo,req.body.newpath)
    return res.status(200).json({message:'OK'})
}

const shareFile = async(req,res)=>{
    if(await fileService.shareFile(req.body) == true)
    res.status(200).json({message:'OK'})
    else res.status(409).json({message:'USUARIO NO ENCONTRADO'})
}

const getShareFiles = async(req,res)=>{
    const fileshare = await fileService.getShareFiles(req.query.user)
    res.send(fileshare)
}

const getFiles = async (req, res) => {
    const file = await fileService.getFile(req.body.user, req.body.path)
    res.send(file);
}

const deleteFile = async (req, res) => {
    await fileService.deleteFile(req.body.user, req.body.name, req.body.path,'papelera')
    res.status(200).json({ message: 'OK' })
}

const deletedFile = async (req,res)=>{
    console.log(req.query);
    await fileService.eliminar(req.query)
    res.status(200).json({message:'OK'})
}

const createFile = async (req, res) => {
    const r = req.body
    if (await fileService.Filexist(r.user, r.name, r.path) == true) {
        await fileService.createFile(req.body)
        res.status(200).json({ message: 'OK' })
    }
    else res.status(409).json({ message: 'CONLFICT' })
}

const getPapelera = async(req,res)=>{
    const archivos = await fileService.getPapelera(req.body)
    res.send(archivos)
}

const updateFile = async (req, res) => {
    await fileService.updateFile(req.body)
    res.status(200).json({ message: 'OK' })
}




module.exports = {
    getFilesByPath,
    getFiles,
    deleteFile,
    createFile,
    updateFile,
    getPapelera,
    shareFile,
    getShareFiles,
    moveFile,
    deletedFile,
    copyFile
}