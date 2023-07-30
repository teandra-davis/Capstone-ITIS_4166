const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    category: {type: String, required: [true, 'Category is required'],
                enum: ['American', 'African', 'Asian', 'European', 'Other']},
    hostName: {type: String, required: [true, 'Host Name is required']},
    location: {type: String, required: [true, 'Location is required']},
    startDate: {type: Date, required: [true, 'Start Date is required']},
    endDate: {type: Date, required: [true, 'End Date is required']},
    details: {type: String, required: [true, 'Details is required'], 
            minlength: [10, 'The content should have at least 10 characters']},
    image: {type: String, required: [true, 'Image Path is required']}
}, 
);

//Collection name is events in the database
module.exports = mongoose.model('Event', storySchema);

/*const { DateTime } = require('luxon');
const {ObjectId} = require('mongodb');

//let counter = events.length; // initialize the counter with the length of the events array

//Reference variable to the event collection in MongoDb
let events;
exports.getCollection = db => {
    events = db.collection('events');
};

//Return a list of stories to the controller
exports.find = function() {
    return events.find().toArray();
};

exports.findById = function(id) {
    return events.findOne({ _id: new ObjectId(id) });
};

exports.save = function(event) {
    //counter++;
    //event.id = counter.toString();
    events.insertOne(event);
};

exports.updateById = function(id, newEvent) {
    stories.updateOne({ _id: ObjectId(id) }, 
    {$set: {title: newEvent.title, category: newEvent.category, hostName: newEvent.hostName, 
    location: newEvent.location, startDate: newEvent.startDate, endDate: newEvent.endDate, 
    details: newEvent.details, image: newEvent.image}});
};

exports.deleteById = function(id) {
    events.deleteOne({ _id: new ObjectId(id) });
};*/