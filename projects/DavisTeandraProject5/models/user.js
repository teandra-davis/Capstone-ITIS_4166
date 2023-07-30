const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'Cannot by Empty']},
    lastName: {type: String, required: [true, 'Cannot by Empty']},
    email: {type: String, required: [true, 'Cannot by Empty'], unique: true},
    password: {type: String, required: [true, 'Cannot by Empty']},  
});

//Replace the plain text password to a hash 
//Pre middleware

userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err=>next(err));
});


//Implement a method that compares the login pass to the hash stores in the database
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);