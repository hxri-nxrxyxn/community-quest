const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use(express.static('./testserver'));

app.use('/api/users', userRoutes);

const CON_STRING = process.env.CON_STRING;

mongoose.connect(CON_STRING,{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected Succesfully");
})
.catch((error) => {
    console.log(error);
});

app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
    console.log('API is working');
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
