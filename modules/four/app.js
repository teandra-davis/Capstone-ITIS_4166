const { response } = require('express');
const express = require('express');

/*Creating the app*/
const app = express();
/*Define port number*/
let port = 3000;
/*Define host*/
let host = 'localhost';

let students = [{id: 1, name: 'Alice', major: 'CS'},
{id: 2, name: 'Teandra', major: 'BA'}, 
{id: 3, name: 'Prince', major: 'BS'}
]

/*Middleware Function*/
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    //Call the next middleware function
    next();
});

//Adding another one
app.use((req, res, next) => {
    console.log('This is a second middleware function')
    next();
});

/*Adding a route to handle the get request*/
app.get('/', (req, res) => {
    //res.send('Home Page');
    /*Easier Way to perform this code via Express
    res.statusCode = 200;
    res.end('Home Page');*/
    console.log(__dirname);
    /*Retrieve query stream*/
    //console.log(req.url);
    //console.log(req.query);
    res.sendFile('./views/index.html',{root: __dirname});
});

/*Send back the array of students back to json*/
app.get('/students/:sid', (req, res) => {
    res.json(students);
});

/*Retrieve route parameters and will send students with a particular id back to the client*/
app.get('/students/:sid', (req, res) => {
    console.log(req.params);

    //Saving the route parameter in the object named id
    let id = req.params.sid;

    //Searching in the students array that match the route parameter (id)
    //We did the parseInt() to pass the 2 string to a number 2 for it find the element
    let student = students.find(element=>element.id === parseInt(id));

    //res.send('Send student with ID');
    res.json(student); 
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

//404 Page not Found
app.use((req, res, next) => {
    res.status(404).send('Page cannot be found');
});


/*Make app listen to particular port*/
app.listen(port, host, () => {
    console.log('The server is running at port', port);
});
