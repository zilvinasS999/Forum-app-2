const resSend = require('../plugins/resSend');
const jwt = require('jsonwebtoken');

module.exports = {
  registerValidate: (req, res, next) => {
    const { username, passwordOne, passwordTwo } = req.body;

    if (username.length < 4 || username.length > 20) {
      return resSend(
        res,
        false,
        null,
        'Username must be between 4 and 20 characters'
      );
    }

    if (passwordOne !== passwordTwo) {
      return resSend(res, false, null, 'Passwords should match');
    }

    if (passwordOne.length < 4 || passwordOne.length > 20) {
      return resSend(
        res,
        false,
        null,
        'Password must be between 4 and 20 characters'
      );
    }

    function hasNumber(str) {
      return /\d/.test(str);
    }

    if (!hasNumber(passwordOne)) {
      return resSend(
        res,
        false,
        null,
        'Password should contain at least one numeric symbol'
      );
    }

    function hasSpecialChar(str) {
      return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }

    if (!hasSpecialChar(passwordOne)) {
      return resSend(
        res,
        false,
        null,
        'Password should contain at least one special character'
      );
    }

    next();
  },
  loginValidate: (req, res, next) => {
    const { username, password } = req.body;

    if (username.length < 4 || username.length > 20) {
      return resSend(
        res,
        false,
        null,
        'Username must be between 4 and 20 characters'
      );
    }

    if (password.length < 4 || password.length > 20) {
      return resSend(
        res,
        false,
        null,
        'Password must be between 4 and 20 characters'
      );
    }
    next();
  },
  tokenAuth: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return resSend(res, false, null, 'No token provided');
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return resSend(res, false, null, 'Authentication error');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return resSend(res, false, null, 'Invalid token');
      }
      req.user = decoded;
      next();
    });
  },
  validateSubTopic: (req, res, next) => {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return resSend(res, false, null, 'Title is required');
    }
    if (!description || description.trim() === '') {
      return resSend(res, false, null, 'Description is required');
    }
    next();
  },
};
