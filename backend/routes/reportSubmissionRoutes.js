const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 

router.post('/submitForm', async (req, res) => {

    console.log("------------------------        IN REPORT SUBM ROUTE     -------------------------------------------------");

    const postData = req.body; // Access the data sent in the request body
    console.log('Received data:', postData);

    try {
      const { title, description, reportFile, user } = postData;


      const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
const currentDateTime = new Date(currentDate);
const currentDayOfMonth = currentDateTime.getDate();

// Calculate start and end of the week based on the corrected current date
const startOfWeek = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDayOfMonth - currentDateTime.getDay());
const endOfWeek = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDayOfMonth + (6 - currentDateTime.getDay()));

console.log('currentDate:', currentDateTime.toLocaleString()); // Output the corrected current date and time in PKT
console.log('startOfWeek:', startOfWeek.toLocaleString()); // Output the start of the week in PKT
console.log('endOfWeek:', endOfWeek.toLocaleString()); // Output the end of the week in PKT

  
      const existingReport = await Report.findOne({
        user,
        dateSubmitted: { $gte: startOfWeek, $lte: endOfWeek },
      });


      console.log('--------------------------------');
      console.log('Data in REPORT Mongo Present: ' , existingReport);

      var status_Check = false;

      if (existingReport) {
        status_Check = false;
        return res.status(400).json({ message: "You have already submitted a report for this week" , status_Check});
      }
      else{
        status_Check = true;
        dateSubmitted =  new Date();
        console.log('Date Submitted: ' , dateSubmitted);
        const newReport = new Report({
            title,
            description,
            reportFile, // This can be a file path or URL if you're storing the file externally
            dateSubmitted,
            user
          });


          await newReport.save();

          return res.status(200).json({ message: 'Report for this submitted successfully'  , status_Check });


      }
      
       
    } catch (error) {

      console.error('Data error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }


  });
  

  module.exports = router;