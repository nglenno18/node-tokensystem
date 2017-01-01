var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
<<<<<<< HEAD
// const validator = require('validator');

var ModeledUser = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 1,
  //   unique: true,
  //   validate: {
  //     validator: validator.isEmail,
  //     message: `{VALUE} is not a valid email `
  //   }
  // },
  id: {
    type: String,
    unique: true
=======
const validator = require('validator');

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
>>>>>>> 9cdab7a9e474982643d2b4ce4ed3988d4642be11
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
<<<<<<< HEAD
    minlength: 1,
    unique: true
  },
  rooms: [{type:String, unique: true}],
  messages: []
=======
    minlength: 1
  },
  rooms: [{type: mongoose.Schema.Types.ObjectId, unique: true}]
>>>>>>> 9cdab7a9e474982643d2b4ce4ed3988d4642be11
});

ModeledUser.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  //import lodash --> need to use pick method to pick which data is returned to user
  return userObject;
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
