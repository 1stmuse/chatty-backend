const express = require('express')
const mongoose = require('module')
const cors = require('cors')
const PORT = process.env.PORT || 5050
const cookie = require('cookie-parser')
require('dotenv').config()
app.use(cookie())


const app = express()

app.use(cors())
app.use(express.json())


app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 400
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(PORT, ()=> console.log('server running'))