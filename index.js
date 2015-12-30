import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

var app = express()
var server = http.Server(app)
var io = socketIo(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// server.listen(3000, () => {
//   console.log('listening on *:3000')
// })

export default app
