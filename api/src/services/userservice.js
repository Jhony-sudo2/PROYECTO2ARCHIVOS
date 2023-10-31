const userModel = require('../models/userModel')

async function getAllUsers (usuario,password2){
    const users = await userModel.find({username:usuario,password:password2});
    console.log('devolviendo' + users);
    return users;
};

 
async function userexist(usuario){
    const user = await userModel.find({username:usuario})
    if(user.length == 0) return true;    
    else return false;
    
}

async function createUser(userData){
    const user = new userModel(userData)
    await user.save()
    return user
};


module.exports = {
    getAllUsers,
    createUser,
    userexist
}