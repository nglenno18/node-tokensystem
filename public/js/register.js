//CLIENT-SIDE javascript
var socket = io();
socket.on('connect', function(){
  console.log(socket.id);
  console.log(`REGISTER PAGE \n\t CLIENT: ${socket.id}`);

  // socket.emit('createEmail', {to: "julie@sdf.com", text: "event emitted from browser console"});
        //^^can be entered through the browser console to the server console
  //CHALLENGE createMessage
  //user1 fires createMessage event from my browser
      //to SERVER --> server fires newMessage events to everyone else

      jQuery('#register-form').on('submit', function(e){
        e.preventDefault();
        var email = jQuery('[name=email]').val();
        var password = jQuery('[name=password]').val();
        // if(password.length < 5 || email.length < 5) return window.location.href = '/register';
        var params = {email, password};

        socket.emit('validateUser', params, function(err){    //add the acknowledgement
          if(!err){
            console.log('User validated: ');
            return window.location.href = '/joinRoom';
          }
          if(err ==='ADD'){
            if(confirm(`Register new Email ${params.email}?`)){
              // window.location.href = '/register';
              console.log('Socket will emit "registerUser"');
              var pconfirm = prompt('Please retype password: ');
              if(pconfirm != params.password){
                alert('Passwords DO NOT MATCH!, please try again');
                return window.location.href = '/';
              }
              socket.emit('registerUser', params, function(es){
                console.log('Returned from addUser in server to client:', es);
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
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});
