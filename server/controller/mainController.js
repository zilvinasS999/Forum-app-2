const resSend = require('../plugins/resSend');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/userSchema');
const postSchema = require('../schemas/postSchema');
const topicSchema = require('../schemas/topicSchema');
const messageSchema = require('../schemas/messageSchema');

module.exports = {
  registerUser: async (req, res) => {
    console.log(req.body);
    try {
      const { username, passwordOne, role } = req.body;

      const userRole = role === 'admin' ? 'admin' : 'regular';

      const userExists = await userSchema.findOne({ username });

      if (userExists)
        return resSend(res, false, null, 'Username is already taken');

      const password = await bcrypt.hash(passwordOne, 10);

      const newUser = new userSchema({
        username,
        password,
        role: userRole,
      });

      await newUser.save();

      resSend(res, true, null, 'all good');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error during registration');
    }
  },
  login: async (req, res) => {
    console.log(req.body);
    try {
      const { username, password } = req.body;

      const user = await userSchema.findOne({ username });

      if (!user) return resSend(res, false, null, 'False auth');

      const passwordGood = await bcrypt.compare(password, user.password);

      if (!passwordGood) return resSend(res, false, null, 'Bad auth');

      const token = jwt.sign({ username }, process.env.JWT_SECRET);

      return resSend(res, true, { token, username }, 'all good');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error during login');
    }
  },
  createTopic: async (req, res) => {
    try {
      const { title } = req.body;
      console.log(req.body);

      if (req.user.role !== 'admin') {
        return resSend(
          res,
          false,
          null,
          'Topics can only be created by admins',
          403
        );
      }

      const newTopic = new topicSchema({
        title,
        createdBy: req.user._id,
      });

      await newTopic.save();

      return resSend(res, true, { topic: newTopic }, null);
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error creating topic', 500);
    }
  },
  createPost: async (req, res) => {
    try {
      const { content } = req.body;
      const { topicId } = req.params;

      if (!content) {
        return resSend(res, false, null, 'Posts cannot be empty');
      }

      const topicExists = await topicSchema.findById(topicId);
      if (!topicExists) {
        return resSend(res, false, null, 'Topic does not exist');
      }

      const userId = req.user._id;

      const newPost = new postSchema({
        content: content,
        topic: topicId,
        createdBy: userId,
      });
      await newPost.save();
      return res, true, { post: newPost }, 'Post created';
    } catch (error) {
      console.error(error);
      return resSend(res, false, null, 'Error creating post');
    }
  },
};
