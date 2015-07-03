'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PacketSchema = new Schema({
  body: String,	
  timestamp: Number,
  location: Schema.Types.Mixed,
  speed: Number,
  active: Boolean
});

module.exports = mongoose.model('Packet', PacketSchema);