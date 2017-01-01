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
}

module.exports = {Users};
