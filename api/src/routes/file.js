const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController');

router
    .post("/",fileController.getFiles)
    .post("/delete",fileController.deleteFile)
    .post("/create",fileController.createFile)
    .put("/update",fileController.updateFile)
    .post('/papelera',fileController.getPapelera)
module.exports = router;
