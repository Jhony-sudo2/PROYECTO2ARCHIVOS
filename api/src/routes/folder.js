const express = require('express')
const router = express.Router()
const folderController = require('../controllers/folderController')

router
    .post("/",folderController.getAllFolders)   
    .post("/create",folderController.createFolder)
    .post("/shared",folderController.getShared)
    .post("/delete",folderController.deleteFolder)

module.exports = router;