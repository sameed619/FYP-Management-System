
const express = require('express')
const app = express()
const connectDb = require('./database.js')
const authRoutes = require('./routes/authRoutes.js'); // Import your auth routes
const cors = require('cors');
const User = require('./models/User.js'); // Import the User model from user.js
const projDet = require('./routes/projDetRoutes.js');
const proposalSubm = require('./routes/proposalSubmission.js')
const ReportSubm = require('./routes/reportSubmissionRoutes.js')
const documentsRep = require('./routes/documentReposRoutes.js')
const groupAdd = require('./routes/addGroupRoute.js');
const SupervisorHome = require('./routes/SupervisorHome.js');
const assignedProjects = require('./routes/assignedProject.js');

app.use(express.json());
app.use(cors());
connectDb();


app.use('/auth', authRoutes);
app.use('/projDetails', projDet);
app.use('/submitProposal', proposalSubm);
app.use('/submitReport', ReportSubm);
app.use('/documentsRep', documentsRep);
app.use('/addGroup', groupAdd);
app.use('/SupervisorHome', SupervisorHome);
app.use('/assignedProjects', assignedProjects);


console.log('Hello WOrld');

app.listen(process.env.PORT, () => {
    console.log("Server Running on Port " , process.env.PORT);
})

