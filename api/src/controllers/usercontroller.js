const userservice = require('../services/userservice')

const getUser = async (req,res) =>{
    const users = await userservice.getAllUsers(req.body.username,req.body.password)
    res.send(users)
}

const createUser = async(req,res)=>{
    if(await userservice.userexist(req.body.username) == true){
        await userservice.createUser(req.body)
        res.status(200).json({message:'OK'})
    }
    else{
        res.status(409).json({message:'CONFLICT'})
    }
}

const updatePassword = async(req,res)=>{
    console.log('cambiando contrasena');
    await userservice.updatePassword(req.body)
    res.status(200).json({message:'OK'})
}


module.exports = {
    getUser,
    createUser,
    updatePassword
};