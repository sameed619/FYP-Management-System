const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});


const projDetails = new mongoose.Schema({
  fypTitle: { type: String, required: true },
  Supervisor: { type: String, required: true },
  Members: { type:Array , required:true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
}); 

const Project = mongoose.model('Project',projDetails)

const User = mongoose.model('User', userSchema);

module.exports = User;
