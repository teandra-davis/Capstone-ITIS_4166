const {body} = require('express-validator');
const Event = require('../models/event');
const {validationResult} = require('express-validator');


//If the user is a guest
exports.validatorId = (req, res, next)=> {
    const id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        const err = new Error('Invalid ID');
        err.status = 400;
        return next(err);
    }
};

exports.validateSignUp = [body('firstName', 'First Name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last Name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateEvent = [body('title', 'Title must not be empty.').trim().notEmpty().escape(),
body('content', 'Content must have a minimum length of 10 characters.').trim().isLength({ min: 10 }).escape(),
(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
        req.flash('error', error.msg);
    });
    return res.redirect('back');
  } else {
    return next();
  }
},
];

exports.validateStartDate = [body('startDate', 'Invalid start date. Start date must be a valid ISO 8601 date and after today\'s date.').isISO8601().isAfter()];

exports.validateCategory = [body('category', 'Invalid category')
  .isIn(['Other', 'African', 'American', 'Asian', 'European'])
  .trim()
  .escape()];

exports.validateEndDate = [body('endDate', 'Invalid end date. End date must be a valid ISO 8601 date.')
.isISO8601()
.custom((endDate, { req }) => {
    if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after the start date.');
    }
    return true;
})];