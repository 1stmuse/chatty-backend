const mongoose = require('mongoose')
const http = require('http')
require('dotenv').config()
const PORT = process.env.PORT || 5050
const jwt = require('jsonwebtoken')
const app = require('./app')
const User = require('./models/UserModel')
const Room = require('./models/chatroomMOdel')
const Chatmessage = require('./models/messagesModel')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    
mongoose.Promise = global.Promise

const server = http.createServer(app) 

const io = require('socket.io').listen(server)
io.use(async(socket, next)=>{
    const token = socket.handshake.query.id
    try {
        const userId =  await jwt.verify(token, process.env.TOKEN_SECRET)
    
        socket.user = userId
        next()
    } catch (error) {
        console.log(error)
    }
})

io.on('connection', socket=>{
    console.log('connected', socket.user)
    socket.emit('connect', (socket.user, 'from BE'))
    socket.on('joinRoom', async (roomId)=>{
        const user = await User.findById(socket.user)

        socket.join(roomId)
        socket.broadcast.to(roomId).emit('new-message', {message:`${user.name} joined the groud`, name:'Admin'})
        socket.emit('new-message', {message: `welcome to the group ${user.name}`, name:'Admin' })
        // console.log('joined room', roomId, user.name)

    })
 
    socket.on('sendMessage', async(message)=>{
        try {
            const newMessage = new Chatmessage({
                chatroom:message.roomId,
                user: socket.user,
                message: message.message
            })
            await newMessage.save()
            io.to(message.roomId).emit('new-message', {message:message.message, name: message.userName})
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('disconnect', ()=>{
        console.log('disconnected', socket.user)
    })
})

server.listen(PORT, ()=> console.log(`server running on ${PORT}`))