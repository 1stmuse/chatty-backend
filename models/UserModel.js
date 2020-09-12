const mongoose= require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{ type:String, required:true, default:'Anon'},
    username: {type:String, required:[true, 'please provide a username'], unique:true},
    password : {type:String, required:true}
}, {timestamps:true} )

const User = mongoose.model('users', userSchema)

module.exports = User