const mongoose = require('mongoose');

const events = new mongoose.Schema({
    eventId : {type : String, unique : true}
});