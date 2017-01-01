//CLIENT-SIDE javascript
var socket = io();
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
  var params = {
    email: jQuery('[name=email]').val(),
    password: jQuery('[name=password]').val()
  };

  socket.emit('validateUser', params, function(err, ree){    //add the acknowledgement
    console.log('\n\nacknowledgement', ree);
    if(err){
      console.log('callback was called', err);
      alert(err);
      window.location.href ='/';
    }
  });
});
