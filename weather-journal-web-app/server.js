// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors'); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/** Listen Port */
const port = 8000;

// Setup Server 'node server.js'
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});


// GET Route Server Side - return project data
app.get('/all', (request, response) => {
    response.send(projectData);
});

//POST Route Server Side - adds data to project data
app.post('/add', (request, response) => {
 
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        userFeelings:request.body.userFeelings,
        name:request.body.name
    };

    response.send(projectData);
});