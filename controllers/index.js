
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res, next) =>{
    const user = await User.findOne({username: req.body.username})
    if(user){
        const error = new Error('this username already exist')
        error.status = 401
        next(error)
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashPassword
    try {
        newUser = new User(req.body)
        await newUser.save()
        res.status(200).json({success:true})
    } catch (err) {
        const error = new Error(er)
        error.status = 401
        next(error)
        
    }
   
}

exports.login = async(req, res, next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
            const error = new Error('username or password incorrect')
            error.status = 401
            next(error)
        }
    
        const password = await bcrypt.compareSync(req.body.password, user.password)
        if(!password){
            const error = new Error('username or password incorrect')
            error.status = 401
            next(error)
        }
        const token = await jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET)
        if(!token){
            const error = new Error('could not generate token')
            error.status = 401
            next(error)
        }
        res.cookie('x_auth', token).status(200).json({success:true, token})
    } catch (err) {
        const error = new Error(err)
            error.status = 401
            next(error)
    }
}