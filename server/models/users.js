var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var ModeledUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email `
    }
  },
  password:{
    type: String,
    require: true,
    minLength: 5
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  rooms: [{type:String, unique: true}],
});

ModeledUser.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  //import lodash --> need to use pick method to pick which data is returned to user
  return _.pick(userObject, ['_id', 'email']);
};
ModeledUser.methods.generateToken = function(){
  var user = this;

  var access = 'auth';
  //generate token
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'secretssecrets').toString();
  //update array
  user.tokens.push({access, token});
  return user.save().then(()=>{ //returning a value as success arg for the next then call
    return token;
  });
  //in server--> .then((token)=>{})
};

ModeledUser.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, 'secretssecrets');
  }catch(e){
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};
  // var access = 'auth';
  // var token = jwt.sign(
  //   {_id: user._id.toHexString(), access},
  //   // 'secretValue').toString();
  //   process.env.JWT_SECRET).toString();
  //
  // user.tokens.push({access, token});
  //
  // return user.save().then(function(){
  //   return token;
  // });

  // ModeledUser.methods.joinRoom = function(roomId){
  //   var user = this;
  //
  //
  // };

  // ModeledUser.methods.addRoom = function(roomId){
  //   //remove any object that has the tokenToDelete value we passed in
  //     //use MongoDB operator $pull
  //   var user = this;
  //
  //   //return to allow chain together the call we set up in server.js
  //   return user.update({  //if match, will remove not just tokenpropert,
  //                         // but the ENTIRE object (w/ token prop, id) --> lose one from tokens array
  //     $pull: {
  //         tokens:{
  //           token: tokenToDelete
  //         }
  //     }
  //   });
  //   //call the update method to update the array
  // };

var User = mongoose.model('User', ModeledUser);

module.exports = {User};
