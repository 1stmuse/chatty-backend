const User = require('../models/UserModel')
const Chatroom = require('../models/chatroomMOdel')

exports.joinRoom =async(userName, roomId)=>{
    try {
        const room = await Chatroom.findById(roomId)
        const members = room.users
        if(members.includes(userName)) return members
        members.push(userName)

        room.users = members
        await room.save()
        return room.users
    } catch (error) {
        console.log(error.message)
    }

}
