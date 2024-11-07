const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId : {type : String, required : true, unique : true },
    eventName : {type : String, required : true},
    time : {type : String, required : true }
});

module.exports = mongoose.model('EventID',eventSchema);