// Import the 'path' module for working with file and directory paths
const path = require('path');

// Export a function that takes an Express app instance as a parameter
module.exports = (app) => {
  // Define a route handler for GET requests to the root path ('/')
  app.get('/', (req, res) => {
    // Send the 'index.html' file as a response
    // The 'path.join' method is used to construct the absolute path to the file
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};