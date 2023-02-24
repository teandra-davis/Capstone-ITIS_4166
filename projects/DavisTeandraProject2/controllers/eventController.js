//Handles the requests and defines the functionality
//Import model
const model = require('../models/event');

//GET /events: send all events to the user
exports.index = (req, res) => {
    let events = model.find();
    res.render('./event/events', {events});
};

//GET /events/new: send html form for creating new events
exports.new = (req, res) => {
    res.render('./event/newEvent');
};

//POST /stories: create a new event
exports.create = (req,res) => {
    //res.send('Created a new event');
    //Read the information from post request
    let event = req.body;
    model.save(event);
    res.redirect('/events');
};


//GET /events/:id: send the details of event identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
       res.render('./event/event', {event}); 
    } else {
       let err = new Error('Cannot find a story with id ' + id);
       err.status = 404;
       next(err);
    }
};

//GET /events/:id/edit: send html form for editing existing events
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
       res.render('./event/edit', {event}); 
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
   
};

//PUT /events/:id: update the event identified by id
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    if(model.updateById(id, event)) {
        res.redirect('/events/'+id);
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};

//Delete /events/:id/ delete the event identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;

    if(model.deleteById(id)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};

