const resSend = require('../plugins/resSend');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/userSchema');

module.exports = {
  registerUser: async (req, res) => {
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
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      const userProfile = await userSchema.findById(userId).populate('posts');

      if (!userProfile) {
        return resSend(res, false, null, 'User not found');
      }
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching user profile');
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user._id;
      const { newImage, username, email } = req.body;

      const updatedUser = await userSchema.findByIdAndUpdate(
        userId,
        { image: newImage, username, email },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return resSend(res, false, null, 'User not found');
      }
      resSend(res, true, { updatedUser }, 'User profile updated successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error updating user profile');
    }
  },
};
