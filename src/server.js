const express = require('express');
const app = express();
const PORT = 3000;

// routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/superMarket')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`); // Just Reminder
  next(); // use Next method
})

// routes
app.use('/api/items', groceriesRoute);
app.use('/api/stores', marketsRoute);

// Test for running Server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}!`));