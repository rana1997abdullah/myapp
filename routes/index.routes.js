const express = require('express')
const router = express.Router()

router.use('/api/todos', 
require('./todo.routes'))

module.exports = router