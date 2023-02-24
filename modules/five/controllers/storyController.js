const model = require('../models/story')

//Get /stories: send all stories to the user
exports.index = (req, res) =>{
    //res.send(model.find());
    let stories = model.find();
    res.render('./story/index', {stories});
};

//GET /stories/new: send html form for creating a new story
exports.new = (req, res) => {
    res.render('./story/new');
    
};

//POST /stories: create a new story

exports.create = (req, res) => {
    //res.send('created a new form');
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

//GET /stories/:id: send details of story identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/show', {story});
    } else{
        //Error message if not found
        let err = new Error('Cannot find a story with id ' + id);
        error.status = 404;
        next(error);
    }
    
};

//GET /stories/:id/edit: send html form for editing an exisiting stories
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);

    if(story) {
        res.render('./story/edit', {story});
    } else {
        //Error message if not found
        let err = new Error('Cannot find a story with id ' + id);
        error.status = 404;
        next(error);
    }
    
};

//PUT /stories/:id: update the story identified by id
exports.update = (req, res, next) => {
    let story = req.body;
    let id = req.params.id;

    if (model.updateById(id, story)) {
        res.redirect('/stories/'+id);
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        error.status = 404;
        next(error);
    }
};

//DELETE /stories/:id: delete the story identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;

    if (model.deleteById(id)) {
        res.redirect('/stories/');
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        error.status = 404;
        next(error);
    }
};

