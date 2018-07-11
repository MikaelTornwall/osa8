const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const storiesRouter = require('./controllers/stories')
const authorsRouter = require('./controllers/authors')

// Check https://mongodb.github.io/node-mongodb-native/

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/stories', storiesRouter)
app.use('/api/authors', authorsRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
