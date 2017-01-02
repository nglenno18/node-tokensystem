var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

ModeledUser.methods.comparePassword = function(plaintext, dbPassword){
  var user = this;
  bcrypt.compare(plaintext, dbPassword, (err, result)=>{
    console.log('\n\n\nResult of comparing password: ', result);
  });
}
ModeledUser.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});
ModeledUser.post('save', function(docs){
  console.log('User has been successfully saved', docs);
})

var User = mongoose.model('User', ModeledUser);

module.exports = {User};
