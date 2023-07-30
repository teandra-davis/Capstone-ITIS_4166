//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const storyRoutes = require('./routes/storyRoutes');
//1. Adding MongoDb
const {MongoClient} = require('mongodb');
//7. Calling the getCollection made in story.js
const {getCollection} = require('./models/story');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
//2. Adding our url
let url = 'mongodb://127.0.0.1:27017'; 
app.set('view engine', 'ejs');

//3.Connecting to Mongodb
MongoClient.connect(url)
//Connection is established
.then(client=>{
    //Importing the collection we created in MongoShell
    const db = client.db('demos');
    //8.Adding this statement to be able to use it in story.js
    getCollection(db);
    //4.Moved the server start to this clause
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
    })
})
.catch(err=>console.log(err.message));

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/stories', storyRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});



