const mongoose= require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const messages = new Schema({
    chatroom : {
        type:ObjectId,
        ref: 'chatrooms',
        required: 'Chat room is required'
    },
    user: {
        type:ObjectId,
        ref: 'users',
        required: 'Chat room is required'
    },
    message: {
        type:String,
        required:'Message is required'
    }
}, {timestamps:true})

const Messages = mongoose.model('messages', messages)

module.exports = Messages