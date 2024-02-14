const express = require('express');
const router = express.Router();

const {
  registerUser,
  login,
  getUserProfile,
} = require('../controllers/userController');
const {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopicTitle,
} = require('../controllers/topicController');
const {
  createPost,
  getPostsByTopic,
  getPostById,
  updatePostContent,
} = require('../controllers/postController');
const {
  sendMessage,
  getMessagesBetweenUsers,
  getMessagesForUser,
} = require('../controllers/messageController');

const {
  registerValidate,
  loginValidate,
  tokenAuth,
} = require('../middleware/middleware');

router.post('/register', registerValidate, registerUser);
router.post('/login', loginValidate, login);
router.post('/topics/:topicId/posts', tokenAuth, createPost);
router.post('/messages/send', tokenAuth, sendMessage);

router.get('/topics', getAllTopics);
router.get('/topics/:topicId', getTopicById);
router.get('/topics/:topicId/posts', getPostsByTopic);
router.get('/posts/:postId', getPostById);
router.get('/messages/:userOneId/:userTwoId', getMessagesBetweenUsers);
router.get('/messages/:userId', getMessagesForUser);
router.get('/users/:userId', tokenAuth, getUserProfile);

router.put('/topics/:topicId', tokenAuth, updateTopicTitle);
router.put('/posts/:postId', tokenAuth, updatePostContent);
