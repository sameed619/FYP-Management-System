const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 

router.post('/submitForm', async (req, res) => {

    console.log("IN SUBM ROUTE---------------------------------------------------------------------");

    const postData = req.body; // Access the data sent in the request body
    console.log('Received data:', postData);


    try {
      // Extract form data from request body
      const { title, description, proposalFile, user } = postData;
      //console.log('Proposal Submission ROUTE Req Body: ' , req.body);
        
      const details = await Proposal.findOne({ user: user }).populate('user');
      console.log('--------------------------------');
      console.log('User in Mongo Present: ' , details);

      var status = false;
       
      if(!details)
        {
            status = true;
      // Create a new project instance
      const newProposal = new Proposal({
        title,
        description,
        proposalFile, // This can be a file path or URL if you're storing the file externally
        user
      });
  
      // Save the new project to the database
      await newProposal.save();
  
      res.status(201).json({ message: 'Project proposal submitted successfully' });
            
        }
        else{
            status = false
            res.status(400).json({ message: 'Already Submitted!' },status);
        }

    } catch (error) {

      console.error('Error submitting project proposal:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;