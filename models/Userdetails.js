const mongoose = require('mongoose');

const UserdetailSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  name: { type: String, required: [true, 'Username cannot be empty'] },
  dob: {
    type: Date,
    required: [true, 'Date of birth cannot be empty'],
  },
  address: { type: String, required: [true, 'Address cannot be empty'] },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Userdetails', UserdetailSchema);
