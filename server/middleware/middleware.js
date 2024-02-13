const resSend = require('../plugins/resSend');
const jwt = require('jsonwebtoken');

module.exports = {
  registerValidate: (req, res, next) => {
    const { username, passwordOne, passwordTwo } = req.body;

    if (username.length < 4 || username.lengh > 20) {
      return resSend(res, false, null, 'bad username length');
    }

    if (passwordOne !== passwordTwo) {
      return resSend(res, false, null, 'passwords should match');
    }

    if (passwordOne.length < 4 || passwordOne.length > 20) {
      return resSend(res, false, null, 'password length is bad');
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

    next();
  },
};
