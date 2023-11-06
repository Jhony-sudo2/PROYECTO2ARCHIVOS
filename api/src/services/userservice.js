const userModel = require('../models/userModel')

async function getAllUsers (usuario,password2){
    const users = await userModel.find({username:usuario,password:password2});
    return users;
};

 
async function userexist(usuario){
    const user = await userModel.find({username:usuario})
    if(user.length == 0) return true;    
    else return false;
    
}

async function updatePassword(usuario){
    console.log(usuario.username + '   nueva: ' + usuario.password);
    await userModel.updateOne({username:usuario.username},{$set:{password:usuario.password}})
}

async function createUser(userData){
    const user = new userModel(userData)
    await user.save()
    return user
};


module.exports = {
    getAllUsers,
    createUser,
    userexist,
    updatePassword
}