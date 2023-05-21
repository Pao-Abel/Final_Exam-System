const express = require('express');
const app = express();

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: false }));

// Handle POST request to /register
app.post('/register', (req, res) => {
  const formData = req.body;
  // Handle the form data and perform the registration logic
  // ...

  // Send a response indicating successful registration
  res.send('Registration successful!');
});

// Start the server
const port = 3306; // Choose a port number
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

