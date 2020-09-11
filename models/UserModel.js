const mongoose= require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type:String, required:[true, 'please provide a username'], unique:true},
    password : {type:String, required:true}
}, {timestamps:true} )

const User = mongoose.model('users', userSchema)

module.exports = User