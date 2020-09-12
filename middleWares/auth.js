const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
require('dotenv').config()

export const jwtVerify= async(req, res, next) =>{
    const token = req.cookies.x-auth

    const decode = await jwt.verify(token, process.env.TOKEN_SECRET)

    const user = await User.findById(decode)
    if(!user){
        const error = new Error('you are not authorized for to perfom this action')
        error.status = 401
        next(error)
    }

    next()
}