const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined');
  process.exit(1);
}

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 2400;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(process.env.DB_CONNECTION_STRING);
