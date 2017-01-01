//ES6 classes
var {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/users');
var {isRealString} = require('./validation');
class Users {
  constructor (){
    this.users = [];
  }
  isEmail(input){
    console.log(`...is ${input} a valid email?`);
    if((input.indexOf('@') > -1) && (input.indexOf('.') > -1)) return true;
    console.log('No... no its not. \n\t ...like not at all');
    return false;
  }

  emailExists(em){
    var result = User.findOne({email:em});
    return result.then((docs)=>{
      if(!docs) return false;
      console.log('Email match was found!');
      return true;
    });
  }

  addUser(email, password){
    var newUser = new User({email, password}).save();
    return newUser.then((saved)=>{
      console.log('\nfromAddUserMethod:: \t', saved);
      return saved;
    });
  }
}

module.exports = {Users};
