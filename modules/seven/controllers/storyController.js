const model = require('../models/story');
exports.index = (req, res, next)=>{
    //10.Changing this line of code
    //let stories = model.find();
    model.find()
    //If successful, pass the template
    .then(stories=>res.render('./story/index', {stories}))
    //If not send error message
    .catch(err=>next(err));
    //res.render('./story/index', {stories});
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    let story = req.body;
    //15. Adding this code
    story.createdAt = new Date();
    model.save(story)
    .then(result=>res.redirect('/stories'))
    .catch(err=>next(err));
};


exports.show = (req, res, next)=>{
    let id = req.params.id;
    //let story = model.findById(id);
    //11.Changing this without a static method
    model.findById(id)
    .then(story=>{
        //12. Moved this from outside then to inside then part
        if(story) {
            res.render('./story/show', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(story=> {
        if(story) {
        res.render('./story/edit', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;

    model.updateById(id, story)
    .then(result=> {
        if(result.modifiedCount === 1){
            res.redirect('/stories/'+id);
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }   
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    model.deleteById(id)
    .then(result=> {
        if(result.deletedCount === 1){
            console.log(result);
            res.redirect('/stories');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }   
    })
    .catch(err=>next(err));
};