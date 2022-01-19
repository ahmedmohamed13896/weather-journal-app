// Setup empty JS object to act as endpoint for all routes
serverData = [];

// Require Express to run server and routes
var express = require("express");

// Start up an instance of app
var app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5555;
const server = app.listen(port,()=>{
    console.log("Server Running");
    console.log(`Running on localhost ${port}`);
});


// Callback function to complete GET '/all'
app.get('/all',(req,res)=>{
    res.send(serverData);
    serverData=[];
})

// Post Route
app.post("/add", (req, res) => {
    console.log(req.body);
    newObject = {
      temp: req.body.temp,
      date: req.body.date,
      content: req.body.content,
    };
    serverData.push(newObject);
});