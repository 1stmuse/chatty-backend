const Router = require('express').Router()
const {register, login, createRoom, getRooms} = require('../controllers')
const auth = require('../middleWares/auth')

Router.post('/user/register', register)
Router.post('/user/login', login)
Router.post('/user/createRoom',auth, createRoom)
Router.get('/user/rooms', auth, getRooms)

module.exports = Router