var mongoose = require('mongoose');
var ModeledMessage = mongoose.model('Message', {
  text: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Number,
    default: new Date().getTime()
  },
  //log the id of the USer object that Created it
  _creator:{
    //type is going to be an OBJECTID in a user from the db
    type: mongoose.Schema.Types.ObjectId//,
    //required: true
  },
  //log the id of the Room that it sits in
  _home:{
    type: mongoose.Schema.Types.ObjectId//,
    //required: true
  }
});

module.exports = {ModeledMessage};
