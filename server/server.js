const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
// path we want to provide to the public express middleware
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {Rooms} = require('./utils/rooms');
// var users = new Users();
var rooms = new Rooms();
console.log(publicPath);
var app = express();
var server = http.createServer(app);  //now using the HTTP server
//now config server to use socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log(`New user connected:  \n\t(socket.id):${socket.id}\n`);
  // var testRoom = rooms.addRoom('ChatRoomFromSEVER');

  socket.on('disconnect', ()=>{
    console.log(`\nUser (${socket.id}) was DISCONNECTED from server\n`);


  });
});

server.listen(port, function(){
  console.log(`Server up and running on port: ${port}`);
});
