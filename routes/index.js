const Router = require('express').Router()
const {register, login, createRoom, getRooms, getRoomMembers} = require('../controllers')
const auth = require('../middleWares/auth')

Router.post('/user/register', register)
Router.post('/user/login', login)
Router.post('/user/createRoom/:token',auth, createRoom)
Router.get('/user/rooms/:token', auth, getRooms)
Router.get('/user/rooms', getRooms)
Router.get('/user/rooms/:roomId/:token', auth, getRoomMembers )

module.exports = Router