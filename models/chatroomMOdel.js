const mongoose= require('mongoose')
const Schema = mongoose.Schema

const chatroom = new Schema({
    name:{type:String, required:true, minlength:3},
}, {timestamps:true})

const Chatroom = mongoose.model('chatrooms', chatroom)

module.exports = Chatroom