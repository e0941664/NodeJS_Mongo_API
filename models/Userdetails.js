const mongoose = require('mongoose');

const UserdetailSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: [true, 'Username cannot be empty'] },
    dob: {
      type: String,
      match: [/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-/-]([0]?[1-9]|[1][0-2])[-/-]([0-9]{4}|[0-9]{2})$/, 'Please check the DOB format'],
      required: [true, 'Date of birth cannot be empty'],
    },
    address: { type: String, required: [true, 'Address cannot be empty'] },
    description: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Userdetails', UserdetailSchema);
