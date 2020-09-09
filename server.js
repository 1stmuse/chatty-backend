const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 5050

const app = require('./app')
const { mongo } = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    mongoose.Promise = global.Promise

const server =app.listen(PORT, ()=> console.log(`server running on ${PORT}`))

const io = require('socket.io')(server)

io.on('connect', socket=>{
    console.log('connected', socket)

    socket.on('disconnect', ()=>{
        console.log('disconnected')
    })
})