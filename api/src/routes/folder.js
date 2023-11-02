const express = require('express')
const router = express.Router()
const folderController = require('../controllers/folderController')

router
    .post("/",folderController.getAllFolders)   
    .post("/create",folderController.createFolder)
    .post("/shared",folderController.getShared)
    .put("/",folderController.deleteFolder)
    .post("/papelera",folderController.getpapelera)
module.exports = router;