//EXPRESS PACKAGE
const express = require('express');
//const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
//const ejs = require('ejs');
const methodOverride = require('method-override');
//Importing the router object(eventRoutes.js)
const eventRoutes = require('./routes/eventRoutes');
const {fileUpload} = require('./middleware/fileUpload');
//MongoDB
const {MongoClient} = require('mongodb');
//const {getCollection} = require('./models/event');
//Mongoose
const mongoose = require('mongoose');

//Creating the app
const app = express();

//Configuring the app
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://tdavi181:9279980NiP@cluster0.kzfbspd.mongodb.net/nbda-project3'
//EJS Set Template Engine
app.set('view engine', 'ejs');

//Connect to MongoDB
mongoose.connect(url)
.then(()=>{
    //const db = client.db('nbda-project3');
    //getCollection(db);
    //Starting the server
    app.listen(port, host, () => {
        console.log('The server is running at port', port);
    })
})
.catch(err=>console.log(err.message));

//Mount the middleware
//So that images, css, and js are found from this folder
app.use(express.static('public'));
//Allows us to POST data
app.use(express.urlencoded({ extended: true }));
//Logs all requests and functions in the terminal
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Set up routes for all pages
app.get('/', (req, res) =>{
    //Index page EJS
    res.render('index');
});

app.get('/contact', (req, res) => {
    //Contact page EJS
    res.render('contact');
});

app.get('/about', (req, res) => {
    //Contact page EJS
    res.render('about');
});

app.post('/events/new', fileUpload, (req, res, next) => {
    let image =  "./images/" + req.file.filename;
    res.render('/events', {image});
});

/*app.post('/events', fileUpload, (req, res, next) => {
    let image = "./image/" + req.file.filename;
    res.render('index', {image});
});*/

//Prefix to handle all the events
app.use('/events', eventRoutes);

app.use((req, res, next) =>{
    let err = new Error('The server cannot location ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) =>{
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

