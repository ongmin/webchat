import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

var app = express()
var server = http.Server(app)
var io = socketIo(server)

// var express = require('express')
// var app = express()
// var http = require('http').Server(app)
// var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(3000, function () {
  console.log('listening on *:3000')
})
