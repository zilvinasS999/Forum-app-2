const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  mainTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Topic', topicSchema);
