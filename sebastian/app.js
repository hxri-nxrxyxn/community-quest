require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect(process.env.CON_STRING,{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected Succesfully");
})
.catch((error) => {
    console.log(error);
});

app.use(express.json);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
