const express = require('express');
const router = express.Router();
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 
router.get('/data/:userId', async (req, res) => {
    console.log('Its here in GET PROJECT DETAILS');
    console.log('Request Params:', req.params); // Log all parameters

    const userId = req.params.userId;
    console.log('User ID:', userId);

    try {
        const details = await Project.findOne({ user: userId }).populate('user');
        
        if (!details || details.length === 0) {
            return res.status(400).json({ message: 'Data Not Found with this user ID' });
        }
        
        
        res.status(200).json({ message: 'Project Data Found', details });
        console.log(details);
        console.log("Project Data Found");
    } catch (error) {
        console.error('Data error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
