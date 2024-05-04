// authRoutes.js

const express = require('express');
const router = express.Router();
const {User,Project} = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');


// Login route
router.post('/login', async (req, res) => {

    console.log("IN LOGIN : ")


  const { email, password } = req.body;
  console.log('Email: ' , email);
  console.log('Password: ' , password);
  
  try {
    // Check if user exists
    const user = await User.findOne({email,password});
    //const passs = await User.findOne({password});

    console.log(user);
   
    const userRole = user.role; // Access the 'role' property from the 'user' object
    console.log('User Role:', userRole);

    if (!user && !passs) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //     return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // If credentials are valid
    res.status(200).json({ message: 'Login successful', user , userRole});
    console.log("Login Sucess!")


} catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
} 
});


module.exports = router;
