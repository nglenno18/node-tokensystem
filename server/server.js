const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
// path we want to provide to the public express middleware
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {Rooms} = require('./utils/rooms');
const {Users} = require('./utils/users');
var users = new Users();
var rooms = new Rooms();
console.log(publicPath);
var _ = require('lodash');
var app = express();
var server = http.createServer(app);  //now using the HTTP server
//now config server to use socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log(`New user connected:  \n\t(socket.id):${socket.id}\n`);

  socket.on('validateUser', function(params, callback){
    console.log('Client has submitted a login request');
    console.log('params: ', params);
    var em = params.email.toUpperCase();
    if(!users.isEmail(em)){
      console.log('ALERT USER to retry email request');
      return callback('INVALID EMAIL REQUEST');
    }
    users.emailExists(em).then((docs)=>{
      if(docs === false) return callback('ADD');
      return callback('Next')
    })
    // if(users.emailExists(em) === false) return callback(`Register new Email ${em}?`);

  });
  socket.on('registerUser', function(params, callback){
    console.log('...Client --> Server addUser...');
    var email = params.email.toUpperCase();
    users.addUser(email, params.password);
  });

  socket.on('disconnect', ()=>{
    console.log(`\nUser (${socket.id}) was DISCONNECTED from server\n`);
  });
});

server.listen(port, function(){
  console.log(`Server up and running on port: ${port}`);
});
