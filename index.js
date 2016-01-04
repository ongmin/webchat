const PORT = process.env.PORT || 8080

import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import path from 'path'

var app = express()
var server = http.Server(app)
var io = socketIo(server)

console.log(__dirname)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/'))
})

var numUsers = 0

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
})


io.on('connection', (socket) => {
  var addedUser = false

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      username: socket.username,
      message: msg
    })
  })

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return

    // we store the username in the socket session for this client
    socket.username = username
    ++numUsers
    addedUser = true

    socket.emit('login', {
      numUsers: numUsers
    })
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    })
  })

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    })
  })

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })
})

server.listen(PORT, function () {
  console.log('listening on PORT:' + PORT)
})
