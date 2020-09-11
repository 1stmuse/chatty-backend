const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 5050
const app = require('./app')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    
mongoose.Promise = global.Promise

const server =app.listen(PORT, ()=> console.log(`server running on ${PORT}`))

const io = require('socket.io')(server)
io.use(async(socket, next)=>{
    const user = socket.handshake.query.id
    socket.userId = user
    next()
})

// io.on('connection', socket=>{
//     console.log('connected', socket.userId)
//     socket.emit('mess', 'hello world')
//     socket.on('inbox', message=>{
//         console.log(message)
//         socket.emit('rece')
//     })

//     socket.on('disconnect', ()=>{
//         console.log('disconnected', socket.userId)
//     })
// })