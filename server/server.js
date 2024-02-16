require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const mainRouter = require('./router/mainRouter');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
console.log(process.env.JWT_SECRET);
mongoose
  .connect(
    'mongodb+srv://zilvinasSt:forum@forum1.4tpwavx.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connection ok');
  })
  .catch((err) => {
    console.log(err);
  });

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined');
  process.exit(1);
}
app.use(express.json());
app.use(cors());

app.use('/', mainRouter);
const PORT = process.env.PORT || 2400;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(process.env.DB_CONNECTION_STRING);

const userId = 'some-test-user-id';
