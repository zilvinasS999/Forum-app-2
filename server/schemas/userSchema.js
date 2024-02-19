const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png',
    },
    role: {
      type: String,
      enum: ['regular', 'admin'],
      default: 'regular',
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
