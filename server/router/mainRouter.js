const express = require('express');
const router = express.Router();

const { registerUser } = require('../controller/mainController');

const { registerValidate } = require('../middleware/middleware');

router.post('/register', registerValidate, registerUser);
