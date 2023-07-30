const Story = require('../models/story');
//If the user is a guest
exports.isGuest = (req, res, next)=> {
    if(!req.session.user){
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
}

//Check if the user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    } else {
        req.flash('error', 'You have to be logged in first');
        return res.redirect('/users/login');
    }
}

//Check if user is the author of the story
exports.isAuthor = (req, res, next)=> {
    let id = req.params.id;


    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    Story.findById(id)
    .then(story=> {
        if(story) {
            if(story.author == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
}