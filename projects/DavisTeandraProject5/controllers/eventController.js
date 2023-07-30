//Handles the requests and defines the functionality
//Import model
const model = require('../models/event');
const RSVP = require('../models/rsvp');

//GET /events: send all events to the user
exports.index = (req, res, next) => {
    model.find()
    .then(events=>res.render('./event/events', {events}))
    .catch(err=>next(err));
};

//GET /events/new: send html form for creating new events
exports.new = (req, res) => {
    res.render('./event/newEvent');
};

//POST /stories: create a new event
exports.create = (req, res, next) => {
    //Read the information from post request
    let event = new model(req.body);
    let image = "./images/" + req.file.filename;
    event.image = image; 
    //event.author = req.session.user;
    event.author = req.session.user._id;
    console.log('Creating event:', event);
    event.save()
    .then(event => {
        console.log(event);
        res.redirect('/events')
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};


//GET /events/:id: send the details of event identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;

    /*if(!id.match(/^[0-9a-fA-f]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }*/

    //model.findById(id).populate('author', 'firstName lastName')
    model.findById(id).populate('author')
    .then(event => {
        if (event) {
            console.log('User in session', req.session.user);
            //return res.render('./event/event', {event, user: req.session.user}); 
            RSVP.aggregate([
                { $match: { event: event._id, status: "YES" } },
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ])
            .then(rsvps => {
                let rsvpCounts = rsvps.length > 0 ? rsvps[0].count : 0;
                res.render('./event/event', { event, user: req.session.user, rsvpCounts });
            })
            .catch(err => next(err));
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));   
};

//GET /events/:id/edit: send html form for editing existing events
exports.edit = (req, res, next) => {
    let id = req.params.id;

    /*if(!id.match(/^[0-9a-fA-f]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }*/

    model.findById(id)
    .then(event => {
        /*if (event) {*/
            return res.render('./event/edit', {event}); 
        /*} else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }*/
    })
    .catch(err=>next(err));
};

//PUT /events/:id: update the event identified by id
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    let image = "./images/" + req.file.filename;
    event.image = image;

    /*if(!id.match(/^[0-9a-fA-f]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }*/

    // Log the event and id to check if they are correct
    console.log("Event: ", event);
    console.log("Id: ", id);

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=> {
        console.log("Updated event: ", event);
        /*if(event){*/
        res.redirect('/events/'+id);
        /*} else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }*/  
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

//Delete /events/:id/ delete the event identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event=> {
        if (event) {
            RSVP.deleteMany({event: event._id})
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        } 
    })
    .catch(err=>next(err));
};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;

    if (!req.session.user) {
        req.flash('error', 'Please log in to RSVP to an event.');
        return res.redirect('/login');
    }

    let userId = req.session.user;
    let rsvpStatus = req.body.status;

    model.findById(id)
    .then((event) => {

        if (event.author.equals(userId)) {
            //req.flash('error', 'You cannot RSVP to your own event.');
            let err = new Error('You cannot RSVP to your own event');
            err.status = 401;
            next(err);
        }

        RSVP.findOneAndUpdate(
            { user: userId, event: id },
            { $set: { status: rsvpStatus } },
            { new: true, upsert: true }
        )
        .then((rsvp) => {
          res.redirect(`/events/`+ id);
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};
