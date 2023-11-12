const express =  require('express')
const mongoose = require('mongoose')
const app = express();
const port = 8080;
const cors = require('cors')
const routes = require('./routes/user')
const folderRoutes = require('./routes/folder')
const fileRoute = require('./routes/file')
app.use(cors())
app.use(express.json())
app.use('/user',routes)
app.use('/folder',folderRoutes)
app.use('/file',fileRoute)



//mongodb connection
mongoose.connect('mongodb://jhony:password@localhost:27017/myapp')
//mongoose.connect('mongodb://jhony:password@database:27017/miapp?authSource=admin')
app.listen(port,() => console.log('listening'))


