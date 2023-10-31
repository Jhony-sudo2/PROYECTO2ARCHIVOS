const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    phone:String,
    username:String,
    password:String,
    type:String,
    email:String
})

const User = mongoose.model('user',userSchema)

module.exports = User;