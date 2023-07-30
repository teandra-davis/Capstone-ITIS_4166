const express = require('express');
//Importing the storyController
const controller = require('../controllers/eventController');
const router = express.Router();
//Edited 
const {fileUpload} = require('../middleware/fileUpload');
const { isLoggedIn, isAuthor, isGuest, setEmpty } = require('../middleware/auth');
const { validatorId } = require('../middleware/validator');


//GET /events: send all events to the user
router.get('/', controller.index);

//GET /events/new: send html form for creating new events
router.get('/new', isLoggedIn, controller.new);

//POST /events: create a new event
//Edited
router.post('/create', fileUpload, controller.create);

//Added
//router.post('/', controller.image);
//Added


//GET /events/:id: send the details of event identified by id
router.get('/:id', validatorId, controller.show);

//GET /events/:id/edit: send html form for editing existing events
router.get('/:id/edit', isLoggedIn, isAuthor, controller.edit);

//PUT /events/:id: update the event identified by id
router.put('/:id', isLoggedIn, isAuthor, validatorId, fileUpload, controller.update);

//Delete /events/:id/ delete the event identified by id
router.delete('/:id', isLoggedIn, isAuthor, validatorId, controller.delete);

module.exports = router;