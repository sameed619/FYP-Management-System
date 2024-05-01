require('dotenv').config()

const mongoose = require('mongoose');

const connectDB = async() => {
    mongoose.connect(process.env.URL, 
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        
        })
    .then(() => console.log("Connection Sucessfull"))
    .catch((e) => console.error(e))
}

module.exports = connectDB