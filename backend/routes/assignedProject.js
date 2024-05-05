const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 



router.get('/data/:email', async (req, res) => {
    console.log(' ------------- Its here in Assigned Projects ROUTER ------------ ');
    console.log('Request Params:', req.params); 

    const email = req.params.email;
    console.log('Email:', email);

    try {
        const details = await Supervisor.findOne({ email: email });
        
        if (!details || details.length === 0) {
            return res.status(400).json({ message: 'Data Not Found with this email' });
        }
        

        const SupervisorName = details.name;

        console.log('Supervisor Name: ' , SupervisorName);
        const projects = await Project.find({Supervisor:SupervisorName})
        

        console.log('Projects Available: ' , projects);


        res.status(200).json({ message: 'Project Data Found', projects });
        console.log(details);
        console.log("Project Data Found");

    } catch (error) {
        console.error('Data error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
