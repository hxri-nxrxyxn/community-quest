const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EventId = require('../models/EventId');

const router = express.Router();

//sent egister data to /register
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
            return res.status(400).send({error : 'User already exists '});
        }
        res.status(400).send({error : `Error registering user ${error} `});
    }
});

router.post('/login',async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.status(404).send({messege : 'User Not Found'});
        const  isPasswordValid = await bycrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            //executed when password is wrong
            res.send({ message: 'login failed',});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    }
    catch (error){
        //error logging in error
        console.log(`Error logging in ${error}`);
    }

});


module.exports = router;