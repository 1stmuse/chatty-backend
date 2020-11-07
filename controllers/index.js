
const User = require('../models/UserModel')
const Chatroom = require('../models/chatroomMOdel')
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
            return
        }
    
        const password = await bcrypt.compareSync(req.body.password, user.password)
        if(!password){
            const error = new Error('username or password incorrect')
            error.status = 401
            next(error)
            return
        }
        const token = await jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET)
        if(!token){
            const error = new Error('could not generate token')
            error.status = 401
            next(error)
        }
        res.cookie('auth', token).status(200).json({success:true, token, user:user, message:'login succesfull'})
    } catch (err) {
        const error = new Error(err)
            error.status = 401
            next(error)
    }
}

exports.createRoom = async (req, res , next)=>{
    const room = await Chatroom.findOne({name: req.body.name})
    if(room){
        const error = new Error('room name already exist')
            error.status = 401
            next(error)
    }else{
        try {
            const newRoom = await new Chatroom(req.body)
            await newRoom.save()
            res.status(200).json({success:true, message:'room created'})
        } catch (err) {
            const error = new Error(err)
            next(error)
        }
    }
}

exports.getRooms = async(req, res, next) =>{
    try {
        const rooms = await Chatroom.find()
        res.status(200).json({success:true, rooms})
    } catch (err) {
        const error = new Error(err)
        error.status = 401
        next(error)
    }
}