const Router = require('express').Router()
const {register} = require('../controllers')

Router.post('/user', register)

module.exports = Router