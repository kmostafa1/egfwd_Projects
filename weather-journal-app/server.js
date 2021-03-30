// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors'); 
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* Listen Port */
const port = 8000;

// Setup Server
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});



// Require Express to run server and routes
/**
 * Get All Data By The: http://localhost:$port/getAll
 */
app.get('/all', (request, response) => {
    response.send(projectData);
});
//.status(200).end()//


/**
 * Post Data By The: http://localhost:$port/postData
 */
app.post('/add', (request, response) => {
    //Post Data Now
    projectData={
        temperature:request.body.temperature,
        date:request.body.date,
        userResponse:request.body.userResponse,
        zoneName:request.body.zoneName
    };
    // console.log(projectData);
    
    // response.send(projectData).status(404).end();
    response.send({
        status:200,
        message: "added successfully"
    });
});

