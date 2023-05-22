const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();

// MongoDB configuration
const mongoUrl = 'mongodb://localhost:27017/mh'; // Replace with your MongoDB connection URL
const mongoCollection = 'register'; // Replace with the desired collection name

let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db();
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware to parse request bodies as JSON
app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/angular-app')));

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  db.collection(mongoCollection)
    .findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        res.status(409).send('Username already exists');
      } else {
        // Create a new user in the database
        db.collection(mongoCollection)
          .insertOne({ username, password })
          .then(() => {
            res.sendStatus(200);
          })
          .catch(error => {
            console.error('Error creating user:', error);
            res.sendStatus(500);
          });
      }
    })
    .catch(error => {
      console.error('Error checking username:', error);
      res.sendStatus(500);
    });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  db.collection(mongoCollection)
    .findOne({ username, password })
    .then(user => {
      if (user) {
        // Authentication successful
        res.sendStatus(200);
      } else {
        // Authentication failed
        res.status(401).send('Invalid username or password');
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.sendStatus(500);
    });
});

// Serve the Angular app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
