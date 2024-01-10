// Import the Express framework
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port to use, either from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse incoming requests with urlencoded and json middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require and use the HTML routes defined in the './routes/htmlRoutes' module
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
