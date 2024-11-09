const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EventId = require('../models/EventId');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

//sent register data to /register
//format username password email
router.post('/register', async(req,res) => {
    try {
        console.log(req.body);
        const hashedPassword = await bycrypt.hash(req.body.password,10);

        //creating new  user
        const user = new User({
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email
        });


        await user.save();
        //user created successfully

        res.status(201).send({message : 'User created Successfully'});
    } catch(error){
        //error registering user
        //1100 for already existing unique ids
        if(error.code == 11000){
            return res.status(202).send({error : 'User already exists '});
        }
        res.status(400).send(error);
    }
});

//format email password
router.post('/login',async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.status(404).send({messege : 'User Not Found'});
        const  isPasswordValid = await bycrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            //executed when password is wrong
            return res.send({ message: 'login failed',});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    }
    catch (error){
        //error logging in error
        console.log(`Error logging in ${error}`);
    }

});

//format eventId eventName laddoo registered

router.post('/addevent', async(req,res) => {
    try {
        console.log(req.body);

        //creating new  user
        const event = new EventId({
            eventId : req.body.eventId,
            eventName : req.body.eventName,
            laddoo : req.body.laddoo,
            registered : req.body.registered
        });


        await user.save();
        //user created successfully

        res.status(201).send({message : 'event created Successfully'});
    } catch(error){
        //error registering user
        //1100 for already existing unique ids
        if(error.code == 11000){
            return res.status(400).send({error : 'event already exists '});
        }
        res.status(400).send({error : `Error registering event ${error} `});
    }
});

//format eventid
// router.post('/eventCheck', async (req,res) => {
//     const event = await EventId.findOne({eventId : req.body.eventId });
//     if(!event) return res.status(404).send({messege : 'Invalid Event'});
//     res.send(event.registered);

// });

//registers for an event
//format email eventid
router.post('/eventregister',async(req,res) => {
    try{
    const username = await User.findOneAndUpdate({ email: req.body.email }, 
        { $push: { events: req.body.eventId } },
        { new: true }
    );
    if(!username){
        return res.status(404).send({ message: 'Username not found' });
    }
    return res.send(username.events);   
}   
catch(error) {
    res.status(400).send({ error: `Error registering user: ${error}` });
}

});

router.get('/event', async (req,res) => {
    try {
        const events = await EventId.find()
         return res.send(events);  
        }
    catch(error){
        res.status(500).send();
    }
});



module.exports = router;