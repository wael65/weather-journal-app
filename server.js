// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express'); // Require Express to run server and routes
const bodyParser = require('body-parser')  // Require body-parser to used as a middle-ware
const cors = require('cors');   // Require cors

const app = express();  // Start up an instance of app

app.use(bodyParser.urlencoded({ extended: false }));  //use body-parser as middle-ware.
app.use(bodyParser.json());

app.use(cors());   // use cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Creating Server
const port = 3000;         // Define server port

// Callback function to running server
const server = app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`);    //Testing server
});

// GET route to return the project data
app.get('/info', (req1, res1) =>{
    res1.send(projectData);
     })

// POST route to save incoming data in the server
app.post('/post', (req2,res2)=>{
    projectData =         // receiving incoming data
    projectData= req2.body 
    res2.send(projectData);
})    