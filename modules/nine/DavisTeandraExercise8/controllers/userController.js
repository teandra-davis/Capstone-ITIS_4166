const model = require('../models/user');
const flash = require('connect-flash');


//Getting the signup form
exports.signUp = (req, res) => {
    model.find();
    res.render('users/new');
};

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
    .then(() => res.redirect('users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('users/new');
        }

        if(err.code === 11000) {
            req.flash('error', "Email has been used");
            return res.redirect('users/new');
        }

        next(err);
    });
};

exports.loginIndex = (req, res) => {
    res.render('users/login');
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    
    //get the user that matches the email
    model.findOne({email: email})
    .then(user=> {
        if(user) {
            //user found in the datebase
            user.comparePassword(password)
            .then(result => {
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in!');
                    res.redirect('/users/profile');
                } else {
                    req.flash('error', "Wrong Password");
                    res.redirect('/users/login');
                }
            })
        } else {
            console.log('Wrong Email Address');
            req.flash('error', "Wrong Email Address");
            res.redirect('/users/login');
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    model.findById(id)
    .then(user=>res.render('users/profile', {user}))
    .catch(err=>next(err));   
};

exports.logout = (req, res, next) => {
    req.session.destroy(err=> {
        if(err)
            return next(err);
        else 
            res.redirect('/users/new');
    });
};
