//Import express modules
const express = require('express');
const controller = require('../controllers/storyController')

//Router objects
const router = express.Router();

//Creating the routes
//Get /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story
router.get('/new', controller.new);
//POST /stories: create a new story

router.post('/', controller.create);

//GET /stories/:id: send details of story identified by id
router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing an exisiting stories
router.get('/:id/edit', controller.edit);

//PUT /stories/:id: update the story identified by id
router.put('/:id', controller.update);

//DELETE /stories/:id: delete the story identified by id
router.delete('/:id', controller.delete);


//export to use in other files
module.exports = router;