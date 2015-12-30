'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

// server.listen(3000, () => {
//   console.log('listening on *:3000')
// })

exports.default = app;