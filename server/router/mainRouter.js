const express = require('express');
const router = express.Router();

const {
  registerUser,
  login,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopicTitle,
  getAllTopicCounts,
  createSubTopic,
  getSubTopics,
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
  updateMessageReadStatus,
  getUnreadMessageCount,
} = require('../controllers/messageController');

const {
  registerValidate,
  loginValidate,
  tokenAuth,
} = require('../middleware/middleware');

router.post('/register', registerValidate, registerUser); // DONE
router.post('/login', loginValidate, login); // DONE
router.post('/topics/:topicId/posts', tokenAuth, createPost); // DONE
router.post('/messages/send', tokenAuth, sendMessage); // DONE
router.post('/topics/:mainTopicId/subtopics', tokenAuth, createSubTopic); // DONE
router.post('/topics', tokenAuth, createTopic); // DONE

router.get('/messages/unread/count', tokenAuth, getUnreadMessageCount); // DONE
router.get('/topics/counts', tokenAuth, getAllTopicCounts); // DONE
router.get('/topics', tokenAuth, getAllTopics);
router.get('/topics/:topicId', tokenAuth, getTopicById);
router.get('/topics/:topicId/posts', tokenAuth, getPostsByTopic);
router.get('/posts/:postId', tokenAuth, getPostById); // DONE
router.get(
  '/messages/:userOneId/:userTwoId',
  tokenAuth,
  getMessagesBetweenUsers
); // DONE
router.get('/messages/:userId', tokenAuth, getMessagesForUser); // DONE
router.get('/users/:userId', tokenAuth, getUserProfile); // DONE
router.get('/topics/:mainTopicId/subtopics', tokenAuth, getSubTopics); // DONE

router.put('/topics/:topicId', tokenAuth, updateTopicTitle); // DONE
router.put('/posts/:postId', tokenAuth, updatePostContent); // DONE
router.put('/user/profile', tokenAuth, updateUserProfile); // DONE

router.put('/messages/:messageId/read', tokenAuth, updateMessageReadStatus); // DONE

module.exports = router;
