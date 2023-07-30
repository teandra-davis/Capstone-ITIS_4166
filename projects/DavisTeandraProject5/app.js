//EXPRESS PACKAGE
const express = require('express');
//const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
//const ejs = require('ejs');
const methodOverride = require('method-override');
//Importing the router object(eventRoutes.js)
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const {fileUpload} = require('./middleware/fileUpload');
//MongoDB
const {MongoClient} = require('mongodb');
//const {getCollection} = require('./models/event');
//Mongoose
const mongoose = require('mongoose');
//User Model
const User = require('./models/user');
//Express-Session
const session = require('express-session');
//Connect-Mongo
const MongoStore = require('connect-mongo');
//Connect-Flash
const flash = require('connect-flash');


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

//Express-session
app.use(
    session({
        secret: 'qwertyuiop',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb+srv://tdavi181:9279980NiP@cluster0.kzfbspd.mongodb.net/nbda-project3'}),
        //One Hour
        cookie:{maxAge: 60*60*1000}
    })
);

//Flash session
app.use(flash());

//Prints out the session
app.use((req, res, next) => {
    console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

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

app.post('/events', fileUpload, (req, res, next) => {
    let image = "./image/" + req.file.filename;
    res.render('index', {image});
});

//Prefix to handle all the events
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) =>{
    let err = new Error('The server cannot location ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) =>{
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
        console.error(err.stack);
    }

    console.error(err.stack);
    res.status(err.status);
    res.render('error', {error: err});
});

