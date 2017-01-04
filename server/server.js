const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

app.get('/accounts', function(request, response){
  console.log('APP. GET /accounts route: ');
  // console.log('[request] = ', request);
  // console.log('[response] = ', response);
  users.getAccounts().then((d)=>{
    return response.send(d);
  });
  // response.render('/register.html');
});
app.get('/register.html', function(request, response){
  console.log('\n\n\nAPP. GET /accounts route: ');
  // console.log('[request] = ', request);
  // console.log('[response] = ', response);
  return response.send('regisiter.html GET from SERVER');
});


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
    if(params.password.length < 5) {callback('Password must be at least 5 characters');}
    users.emailExists(em).then((docs)=>{
      if(docs === false) return callback('ADD');
      console.log('Docs returned from DB email search: ', docs);

      var returnedPassword = docs.password;
      bcrypt.compare(params.password, docs.password, (err, result)=>{
        console.log('\n\n\nResult of comparing password: ', result);
        if(result){
          console.log('\n\n Email AND HASHED password matched\n');
          callback();
        }else return callback('Password does not match that Email Account')
      });
    });

  });
  socket.on('registerUser', function(params, callback){
    console.log('...Client --> Server addUser...');
    var email = params.email.toUpperCase();
    var ptoken = params.password;
    console.log('ADD USER (password ptoken) created: ', ptoken);
    var newUser = users.addUser(email, ptoken);
    newUser.then((token)=>{
      console.log(`New user added, new token `, token);
      callback(token);
    }).catch((e)=>{
      console.log('Error returned to server, should send back to client', e);
    });
  });


  socket.on('login', function(email, callback){
    console.log('LOGIN method called in server...', email);
    console.log(socket);
    // callback(socket);
    callback();
  });

  socket.on('disconnect', ()=>{
    console.log(`\nUser (${socket.id}) was DISCONNECTED from server\n`);
  });
});

server.listen(port, function(){
  console.log(`Server up and running on port: ${port}`);
});
