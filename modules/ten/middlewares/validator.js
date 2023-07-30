const Story = require('../models/story');
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
}