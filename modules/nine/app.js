//require modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/demos', 
                {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
//Express-session
app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: false,
    //One Hour
    cookie:{maxAge: 60*60*1000}
}));

//Prints out the session
app.use((req, res, next)=> {
    if (!req.session.counter) 
        req.session.counter = 1;
    else 
        req.session.counter++;
    console.log(req.session);
    next();
});

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

//Get the signup form
app.get('/new', (req, res) =>{
    res.render('new');
});

//Create a new user
app.post('/', (req, res, next) => {
    let user = new User(req.body);
    user.save()
    .then(() => res.redirect('/login'))
    .catch(err=>next(err));
});

//get the login page
app.get('/login', (req, res) =>{
    res.render('login');
});

//process the login request
app.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user => {
        if(user) {
            user.comparePassword(password)
            .then(result => {
                if(result) {
                    res.redirect('/profile');
                } else {
                    console.log('Wrong Password');
                    res.redirect('/login');
                }
            })
        } else {
            console.log('Wrong email address');
            res.redirect('/login')
        }
    })
    .catch(err=>next(err));
});

//get profile
app.get('/profile', (req, res) => {
    res.render('profile');
});

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
