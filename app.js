const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')

const app = express()
const routes = require('./routes')

app.use(cors())
app.use(cookie())
app.use(express.json())
// app.use((req,res, next)=>{
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept')
//     next()
// })
app.use('/api', routes)

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 400
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            error:true,
            message: error.message
        }
    })
})


module.exports = app