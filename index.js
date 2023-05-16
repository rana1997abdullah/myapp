// Import packages
const express = require('express')
const cors = require('cors')


// App
const app = express();
app.use(cors());
app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})
// Starting server
app.listen('8080')