//1. Require modules
const express = require('express');
const morgan = require('express');
const storyRoutes = require('./routes/storyRoutes');
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

//5. Set up routes for all pages
app.get('/', (req, res) =>{
    //Index page
    res.render('index');
});

app.use('/stories', storyRoutes);

//6. Start the server
app.listen(port, host, () =>{
    console.log('Server is running at port: ', port);
})