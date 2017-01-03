//CLIENT-SIDE javascript
var socket = io();
socket.on('connect', function(){
  console.log(socket.id);
  console.log(`REGISTER PAGE \n\t CLIENT: ${socket.id}`);

    jQuery('#register-form').on('submit', function(e){
      e.preventDefault();
      var email = jQuery('[name=email]').val();
      var password = jQuery('[name=password]').val();
      var retype = jQuery('[name=retype]').val();
      if(email.indexOf('@') === -1){
        $("#text").focus();
        return alert('Please enter a valid email')
      }
      if(password.length < 5){
        $("#password-text").focus();
        return alert('Password length must be at least 5 characters');
      }
      if(password != retype){
        $("#retype-text").focus();
        return alert('Passwords do not match');
      }
      // if(password.length < 5 || email.length < 5) return window.location.href = '/register';
      var params = {email, password};

      // socket.emit('validateUser', params, function(err){    //add the acknowledgement
      //   if(!err){
      //     console.log('User validated: ');
      //     return window.location.href = '/join.html';
      //   }
      //   if(err ==='ADD'){
      //     if(confirm(`Register new Email ${params.email}?`)){
      //       // window.location.href = '/register';
      //       console.log('Socket will emit "registerUser"');
      //       var pconfirm = prompt('Please retype password: ');
      //       if(pconfirm != params.password){
      //         alert('Passwords DO NOT MATCH!, please try again');
      //         return window.location.href = '/';
      //       }
      //       socket.emit('registerUser', params, function(es){
      //         console.log('Returned from addUser in server to client:', es);
      //         // window.location.href = '/registerUser';
      //       });
      //     }
      //     else window.location.href ='/';
      //   }else{
      //     console.log('callback was called', err);
      //     alert(err);
      //     window.location.href ='/';
      //   }
      // });
      socket.emit('registerUser', params, function(err){
        console.log('emitted the registerUser request');
        if(!err.email){
          if(confirm('Email is already registered\n Return to Login Page?')){
            return window.location.href = "/";
          }else{
            return window.location.href = "/register.html"
          }
        }else{
          console.log('New user was created: ', err);
          return window.location.href = "/join.html";
        }
      });
    });
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});
