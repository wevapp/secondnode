const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/expressdb')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.res))