const mongoose = require('mongoose')
const http = require('http')
require('dotenv').config()
const PORT = process.env.PORT || 5050
const jwt = require('jsonwebtoken')
const app = require('./app')
const User = require('./models/UserModel')
const Room = require('./models/chatroomMOdel')
const Chatmessage = require('./models/messagesModel')
const {joinRoom, getRoomMembers} = require('./utils/index')

mongoose.connect('mongodb://localhost/chatty', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    
mongoose.Promise = global.Promise
const randomId = () => Math.random()

const server = http.createServer(app) 

const io = require('socket.io').listen(server)
io.use(async(socket, next)=>{
    const token = socket.handshake.query.id
    try {
        const userId =  jwt.verify(token, process.env.TOKEN_SECRET)
    
        socket.user = userId
        next()
    } catch (error) {
        console.log(error)
    }
})

io.on('connection', socket=>{
    // console.log('connected', socket.user)
    socket.emit('connect', (socket.user, 'from BE'))
    socket.on('joinRoom', async (roomId)=>{
        const user = await User.findById(socket.user)
        // const users = await 

        socket.join(roomId)
        const users = await joinRoom(user.name,roomId)
        // console.log(users)
        socket.emit('members', users)
        socket.broadcast.to(roomId).emit('new-message', {message:{id:randomId(), message:`${user.name} joined the groud`}, name:'Admin'})
        socket.emit('new-message', {message: {id:randomId(), message:`welcome to the group ${user.name}`}, name:'Admin'})

    })
 
    socket.on('sendMessage', async(message)=>{
        try {
            const newMessage = new Chatmessage({
                chatroom:message.roomId,
                user: socket.user,
                message: message.message
            })
            const savedMessage = await newMessage.save()
            io.to(message.roomId).emit('new-message', {message:{id:savedMessage._id, message:savedMessage.message}, name: message.userName})
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('disconnect', ()=>{
        // console.log('disconnected', socket.user)
    })
})

server.listen(PORT, ()=> console.log(`server running on ${PORT}`))