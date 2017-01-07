var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true
  },
  occupants: [{type : String, unique: true }],
  messages: []
});

RoomSchema.methods.pushOccupant = function(displayName){
  var room = this;
  // var roomObject = user.toObject();
  console.log(`\n PUSHING Occupant (${displayName} into ROOM: ${room.roomName})`);
  room.occupants.push(displayName);
  room.save();
};
RoomSchema.methods.spliceOccupant = function(index){
  var room = this;
  // var roomObject = user.toObject();
  console.log(`\n SPLICING Occupant (${index} into ROOM: ${room.roomName})`);
  room.occupants.splice(index, 1);
  room.save();
};

RoomSchema.methods.pushMessage = function(msgName){
  var room = this;
  // var roomObject = user.toObject();
  console.log(`\n PUSHING Message (${msgName} into ROOM: ${room.roomName})`);
  room.messages.push(msgName);
  room.save();
  return;
};

var ModeledRoom = mongoose.model('Room', RoomSchema);

module.exports = {ModeledRoom};
