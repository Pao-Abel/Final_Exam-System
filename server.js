const express = require('express');
const { MongoClient } = require('mongodb');
const { ngExpressEngine } = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./path-to-your-app-module.ngfactory'); // Update with the path to your app's module factory

const app = express();

// MongoDB configuration
const mongoUrl = 'mongodb://localhost:27017/my-database'; // Replace with your MongoDB connection URL
const mongoCollection = 'my-collection'; // Replace with the desired collection name

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

// Server-side rendering route
app.get('*', (req, res) => {
  // Fetch data from MongoDB
  db.collection(mongoCollection)
    .find()
    .toArray()
    .then(data => {
      // Render Angular application
      const renderOptions = {
        bootstrap: AppServerModuleNgFactory,
        providers: [
          provideModuleMap(LAZY_MODULE_MAP),
          { provide: 'serverUrl', useValue: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}` }
        ]
      };

      ngExpressEngine(renderOptions)
        .then(html => {
          // Send the rendered HTML response
          res.setHeader('Content-Type', 'text/html');
          res.send(html);
        })
        .catch(error => {
          console.error('Server rendering error:', error);
          res.sendStatus(500);
        });
    })
    .catch(error => {
      console.error('MongoDB error:', error);
      res.sendStatus(500);
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
