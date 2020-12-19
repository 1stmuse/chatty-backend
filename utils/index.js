const User = require('../models/UserModel')
const Chatroom = require('../models/chatroomMOdel')

exports.joinRoom =async(userName, roomId)=>{
    try {
        const room = await Chatroom.findById(roomId)
        room.users.push(userName)
        await room.save()
    } catch (error) {
        console.log(error.message)
    }

}
