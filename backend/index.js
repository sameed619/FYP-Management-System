
const express = require('express')
const app = express()
const connectDb = require('./database.js')
const authRoutes = require('./routes/authRoutes.js'); // Import your auth routes
const cors = require('cors');
const User = require('./models/User.js'); // Import the User model from user.js


app.use(express.json());
app.use(cors());
connectDb();

// app.use('/', (req,res) => {
//     console.log("Hi!");
//     res.send("Here!");
// })

app.use('/auth', authRoutes);


console.log('Hello WOrld');

app.listen(process.env.PORT, () => {
    console.log("Server Running on Port " , process.env.PORT);
})

