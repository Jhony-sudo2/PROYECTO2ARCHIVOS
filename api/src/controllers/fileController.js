const fileService = require('../services/fileService')

const getFilesByPath = async (req, res) => {
    const files = await fileService.getFilesByPath(req)
    res.send(files)
}

const getFiles = async (req, res) => {
    const file = await fileService.getFile(req.body.user, req.body.path)
    res.send(file);
}

const deleteFile = async (req, res) => {
    await fileService.deleteFile(req.body.user, req.body.name, req.body.path)
    res.status(200).json({ message: 'OK' })
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
    const archivos = await fileService.getPapelera(req.body.path)
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
    getPapelera
}