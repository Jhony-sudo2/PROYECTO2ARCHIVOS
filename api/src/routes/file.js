const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController');

router
    .post("/",fileController.getFiles)
    .post("/delete",fileController.deleteFile)
    .post("/create",fileController.createFile)
    .put("/update",fileController.updateFile)
    .put("/",fileController.updateFile)
    .post('/papelera',fileController.getPapelera)
    .post('/share',fileController.shareFile)
    .get('/share',fileController.getShareFiles)
    .put('/move',fileController.moveFile)
    .post('/deleted',fileController.deletedFile)
    .delete('/',fileController.deletedFile)
    .post('/copia',fileController.copyFile)
module.exports = router;
