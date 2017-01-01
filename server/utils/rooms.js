//ES6 classes
var {isRealString} = require('./validation');
var {mongoose} = require('./../db/mongoose');
const {ModeledRoom} = require('./../models/rooms');

class Rooms {
  constructor (){
    this.rooms = [];
  }
  isTaken(name){
    var list = this.rooms.filter((room)=> room.name === name);
    if(list.length > 0) {
      return true;
    }
    return false;
  }
  pushOccupant(roomName, userName){
    console.log('\n\nUser to be pushed into room  ', roomName);
    var room =
    ModeledRoom.findOne({roomName:roomName}).then((removed)=>{
          console.log('Found in ROOMS DB: ', removed);
          removed.pushOccupant(userName);
        });
  }
  pushMessage(roomName, msg){
    console.log(`\n...starting rooms.pushMessage(${roomName}, ${msg})\n`);
    ModeledRoom.findOne({roomName:roomName}).then((retrieved)=>{
          console.log('(pushMessage)Found in ROOMS DB: ', retrieved);
          retrieved.pushMessage(msg);
        });
  }

  addRoom(name){
    var message = "";
    var messages = [];
    if(isRealString(name)){
      if(this.isTaken(name)===false){
        var room = {name, messages}
        var roomDB = new ModeledRoom({roomName:name, messages}).save();
        roomDB.then((docs)=>{
          console.log(`room SAVED to the DB: ${docs}`);
        });
        this.rooms.push(room);
        return room;
      }else {
        message = 'Room is Taken';
      }
    }
    return message;
  }
  getRoomsList(){
    console.log(this.rooms);
    return this.rooms;
  }

  getRoom(name){
    var matches = this.rooms.filter(function(r){
      return r.name === name
    });
    return matches[0];
  }

  roomIsEmpty(room){
    var gotRoom = this.getRoom(room);
    var userList;
    if(gotRoom != undefined) {
        userList = getUserList(gotRoom);
    }else{
      console.log(room, ' Chat Room does not exist');
    }
    console.log(`Is ${gotRoom} empty?`);
    if(userList && userList.length > 0) return false;
    else return true;
  }
  ///REMOVE----------------------------------
  removeRoom(name){
    //return the object after you remove it from the list
    var gotRoom = this.rooms.filter(function(ro){
      return ro.name === name.name;
    });
    console.log(this.rooms);
    console.log('ROOM to Be REMOVED: ', gotRoom);
    var room;
    if(!gotRoom.length > 0){
      console.log(`\tChatRoom(${name.name}) NOT FOUND -- could NOT return a ChatRoom`);
      return undefined;
    }
    room = gotRoom[0];
    var index = this.rooms.indexOf(room);
    console.log(room, index);
    this.rooms.splice(index, 1);
    var splicedRoom = ModeledRoom.findOne({roomName:room.name}).then((removed)=>{
      console.log('Found in DB: ', removed);
      removed.remove();
    });
    console.log(this.rooms);
  }

  updateMessages(name, message){
    // var r = this.getRoom(name);
    console.log('\n\nRoom Name to be updated: ', name);
    var matches= this.rooms.filter(function(r){
      return r.name === name;
    });
    var r = matches[0];
    console.log('\n', r);      //HOW  IS THIS UNDEFINED
    console.log('\n\n\n');
    if(r){
      console.log('\nShould have updateMessages for ROOM', r.name);
      console.log('MSG to be pushed into room:', message);
      r.messages.push(message);
      return r;
    }
  }

  updateMessages(name, message){
    // var r = this.getRoom(name);
    console.log('\n\nRoom Name to be updated: ', name);
    var matches= this.rooms.filter(function(r){
      return r.name === name;
    });
    var r = matches[0];
    console.log('\n', r);      //HOW THE FUCK IS THIS UNDEFINED
    console.log('\n\n\n');
    if(r){
      console.log('Should have updateMessages for ROOM', r.name);
      console.log(message);
      r.messages.push(message);
      return r;
    }
  }
}

module.exports = {Rooms};
