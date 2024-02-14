const express = require('express');
const router = express.Router();

const {
  registerUser,
  login,
  createPost,
  sendMessage,
  getAllTopics,
  getTopicById,
  getPostsByTopic,
  getPostById,
  getMessagesBetweenUsers,
  getMessagesForUser,
} = require('../controller/mainController');

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
