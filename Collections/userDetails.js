const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: function (phNum) {
        return /\d{10}/.test(phNum);
      },
      message: function(props) {
        return `${props.value} is not a valid phone number!`
      }
    },
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const UserDetails = mongoose.model('UserDetails', userSchema);

module.exports = UserDetails;
