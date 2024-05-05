// Backend API code using Express.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const {User,Project,Proposal,Report,Document,Supervisor} = require('../models/User'); 

console.log('---------------- IN DOC ROUTES -------------');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = 'uploads/';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename for storage
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {

    console.log('---------------- IN UPLOAD -------------');
    console.log('Received in Upload: ' , req.body);

    const { filename, path } = req.file;
    //const { userId } = req.body; 

    const userId = req.body.userId; // Explicitly extract userId from req.body


    console.log('User Id: ' ,userId );

    const newDocument = new Document({ filename, filePath: path, userId });
    await newDocument.save();
    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server error');
  }
});

// Download endpoint
router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const file = `uploads/${filename}`;
  res.download(file, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Documents endpoint for loading documents in frontend
router.get('/load/:userId', async (req, res) => {
  try {


    console.log("-------------- IN LOAD -------------");
    
    
    const userId = req.params.userId;

    console.log('User Id: ' , userId);
    
    const documents = await Document.find({ userId });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;