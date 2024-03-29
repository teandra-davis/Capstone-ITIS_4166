const express = require('express');
//Importing the storyController
const controller = require('../controllers/eventController');
const router = express.Router();
//Edited 
const {fileUpload} = require('../middleware/fileUpload');


//GET /events: send all events to the user
router.get('/', controller.index);

//GET /events/new: send html form for creating new events
router.get('/new', controller.new);

//POST /stories: create a new event
//Edited
router.post('/', fileUpload, controller.create);

//Added
//router.post('/', controller.image);
//Added


//GET /events/:id: send the details of event identified by id
router.get('/:id', controller.show);

//GET /events/:id/edit: send html form for editing existing events
router.get('/:id/edit', controller.edit);

//PUT /events/:id: update the event identified by id
router.put('/:id', fileUpload, controller.update);

//Delete /events/:id/ delete the event identified by id
router.delete('/:id', controller.delete);

module.exports = router;