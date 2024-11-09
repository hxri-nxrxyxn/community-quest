const mongoose = require('mongoose');

//data about event can be changed

const eventSchema = new mongoose.Schema({
    eventId : {type : String, required : true, unique : true },
    eventName : {type : String, required : true},
    laddoo : {type : Number, required : true},
    registered : {type : Boolean, default : false}
    //time : {type : String, required : true },
});

module.exports = mongoose.model('EventId',eventSchema);



