//CLIENT-SIDE javascript
var socket = io();
var token;
socket.on('connect', function(){
  console.log(socket.id);
  console.log(`NEW CONNECTION (this message was sent from index.html) \n\t CLIENT: ${socket.id}`);

  // socket.emit('createEmail', {to: "julie@sdf.com", text: "event emitted from browser console"});
        //^^can be entered through the browser console to the server console
  //CHALLENGE createMessage
  //user1 fires createMessage event from my browser
      //to SERVER --> server fires newMessage events to everyone else
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});

jQuery('#login-form').on('submit', function(e){
  e.preventDefault();
  console.log('CLIENT submitted Email credentials to SERVER');
  var password = jQuery('[name=password]').val()
  var params = {
    email: jQuery('[name=email]').val(),
    password: jQuery('[name=password]').val()
  };

  socket.emit('validateUser', params, function(err){    //add the acknowledgement
    if(err === 'Next'){
      return console.log('User validated: ');
      return window.location.href = '/joinRoom';
    }
    if(err ==='ADD'){
      if(confirm(`Register new Email ${params.email}?`)){
        // window.location.href = '/register';
        console.log('Socket will emit "registerUser"');
        socket.emit('registerUser', params, function(es){
          console.log('Returned from addUser in server to client:', es);
          token = es;
          console.log('Token variable', token);
          // window.location.href = '/registerUser';
        });
      }
      else window.location.href ='/';
    }else{
      console.log('callback was called', err);
      alert(err);
      window.location.href ='/';
    }
  });
});
