const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../controller/mainController');

const { registerValidate, loginValidate } = require('../middleware/middleware');

router.post('/register', registerValidate, registerUser);
router.post('/login', loginValidate, login);
