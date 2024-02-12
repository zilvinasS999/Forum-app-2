const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
});

module.exports = mongoose.model('myUsersAuth', userSchema);
