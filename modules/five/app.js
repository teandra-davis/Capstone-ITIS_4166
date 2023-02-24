//1. Require modules
const express = require('express');
const morgan = require('express');
const storyRoutes = require('./routes/storyRoutes');
const methodOverride = require('method-override');
//2. Create application
const app = express();

//3. Configure applications
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//4. Mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//5. Set up routes for all pages
app.get('/', (req, res) =>{
    //Index page
    res.render('index');
});

app.use('/stories', storyRoutes);

//404 Error Handlers
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

//6. Start the server
app.listen(port, host, () =>{
    console.log('Server is running at port: ', port);
})