// server.js to run production build of react app heroku.

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


  app.use(express.static(__dirname));
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(port, () => console.log(`Listening on port ${port}`));
