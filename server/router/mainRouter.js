const express = require('express');
const router = express.Router();

const {
  registerUser,
  login,
  createPost,
  sendMessage,
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
