const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required']},
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'Event is required']},
    status: {type: String, enum: ['YES', 'NO', 'MAYBE'], required: [true, 'Status is required']},
});

module.exports = mongoose.model('RSVP', rsvpSchema);