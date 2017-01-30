const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

// Setup logger
app.use(morgan('combined'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

const store = {}

const atpoller = require('./atpoller')
atpoller(store)()
const api = require('./api')
app.use('/api', api(store))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
