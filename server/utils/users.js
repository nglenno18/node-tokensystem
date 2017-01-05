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
    return false;
  }

  emailExists(em){
    var result = User.findOne({email:em});
    return result.then((docs)=>{
      if(!docs) return false;
      console.log('Email match was found!', docs);
      return docs;
    });
  }
  getAccounts(){
    var result = User.find({});
    return result.then((docs)=>{
      if(!docs) return 'User DB is empty(no emails)'
      console.log('Emails were found', docs);
      return docs;
    });
  }

  addUser(email, password){
    var newUser = new User({email, password}).save();
    return newUser.then((saved)=>{
      console.log('\nfromAddUserMethod:: \t', saved);
      return saved;
    }).catch(function(e){
      if(e.name === 'MongoError') return e.name;
      console.log('ERROR adding User: ', e.message);
      return e.message;
    });
  }

  findToken(token){
    var t = User.findByToken(token);
    //console.log(t);
    return t.then((d)=>{
      if(d){
        console.log('Docs to Util from model.findByToken:', d);
        return d;
      }
    });
  }
  // addUser(email, password){
  //   var newUser = new User({email, password}).save();
  //   return newUser.then((saved)=>{
  //     console.log('\nfromAddUserMethod:: \t', saved);
  //     console.log('generate a token for the new user');
  //     return saved.generateToken();
  //   }).then((token)=>{
  //     console.log('token', token);
  //     return token;
  //   });
  // }

}

module.exports = {Users};
