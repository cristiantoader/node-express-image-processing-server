
let express = require('express');
let path = require('path');
let router = require('./src/router')

const app = express()

const pathToIndex = path.resolve(__dirname, '../client/index.html')

app.use('/', router)
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use('/*', (req, res) => res.sendFile(pathToIndex))

module.exports = app