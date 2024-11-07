const mongoose = require('mongoose');

//data about user

const user = new mongoose.Schema({
    username : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true }
});

module.exports = mongoose.model('User',user);