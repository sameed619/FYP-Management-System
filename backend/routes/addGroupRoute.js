const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 

router.post('/addGroupDB', async (req, res) => {

    console.log("IN ADD GROUP ROUTE---------------------------------------------------------------------");

    const postData = req.body; // Access the data sent in the request body
    console.log('Received data:', postData);

    var checkStatus;

    try {

      const { title, GroupMembers, GroupEmail, GroupPassword , SupervisorEmail } = postData;


      const checkExistingUser = await User.findOne({ email: GroupEmail });

      if(checkExistingUser)
        {
            checkStatus = false;
            return res.status(400).json({ message: "This Group already exists!" , checkStatus});
        }
       else
       { 

        checkStatus = true;

        
      const supervisorDetails = await Supervisor.findOne({ email: SupervisorEmail });
      console.log('--------------------------------');
      console.log('Supervisor Details: ' , supervisorDetails);

      const supervisorName = supervisorDetails.name;
      const role = 'student';

      console.log('Supervisor Name: ' , supervisorName);

      console.log('GroupEmail:', GroupEmail);
      console.log('Password:', GroupPassword);
      console.log('Role:', role);
      
        
        const newUser = new User({
            email: GroupEmail,
            password: GroupPassword,
            role: role, 
      });
  
      await newUser.save();

      const newUserDetails = await User.findOne({ email: GroupEmail });
      console.log('--------------------------------');
      console.log('New User Details: ' , newUserDetails);

      
      const newUserId = newUserDetails._id;


      const arrMembers = GroupMembers.split(",");

      const newProject = new Project({
        fypTitle: title,
        Supervisor: supervisorName,
        Members: arrMembers,
        user: newUserId,
  });

  await newProject.save();
  
  checkStatus = true;

  console.log('Status before Response: ' , checkStatus);
  
      res.status(201).json({ message: 'Group added successfully', checkStatus });
            
    }


    } catch (error) {

        checkStatus = false; 
      console.error('Error Adding Group:', error);
      res.status(500).json({ error: 'Server error' , checkStatus });
    }
  });
  
  module.exports = router;