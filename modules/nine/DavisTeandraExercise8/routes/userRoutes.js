const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//GET get the signup form

router.get('/new', controller.signUp);

//POST /stories: create a new user

router.post('/', controller.create);

router.get('/login', controller.loginIndex);

router.post('/login', controller.login);

router.get('/profile', controller.profile);

router.get('/logout', controller.logout);


module.exports = router;