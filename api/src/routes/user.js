const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')

router
    .post("/",usercontroller.getUser)
    .post("/create",usercontroller.createUser)
    


module.exports = router;