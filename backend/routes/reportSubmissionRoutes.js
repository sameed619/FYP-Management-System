const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report} = require('../models/User'); 

router.post('/submitForm', async (req, res) => {

    console.log("------------------------        IN REPORT SUBM ROUTE     -------------------------------------------------");

    const postData = req.body; // Access the data sent in the request body
    console.log('Received data:', postData);


    try {
      // Extract form data from request body
      const { title, description, reportFile, user } = postData;
      //console.log('Proposal Submission ROUTE Req Body: ' , req.body);
        
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));

      console.log('currentDate: ' , currentDate);
      console.log('start: ' , startOfWeek);
      console.log('end: ' , endOfWeek);

      
      
      const existingReport = await Report.findOne({
        user,
        dateSubmitted: { $gte: startOfWeek, $lte: endOfWeek },
      });


      console.log('--------------------------------');
      console.log('Data in REPORT Mongo Present: ' , existingReport);

      var status_Check = false;

      if (existingReport) {
        status_Check = false
        return res.status(400).json({ message: "You have already submitted a report for this week" }, status_Check);
      }
      else{
        status_Check = true;
        dateSubmitted =  new Date();
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