//const { DateTime } = require("luxon");
//const {v4: uuidv4} = require('uuid');
//14.Requiring object id
const {ObjectId} = require('mongodb');

//5.Need a reference variable to the stories collection in MongoDb
let stories;
exports.getCollection = db=>{
    stories = db.collection('stories');
}

//9. Changing this method to use MongoDb since stories is not longer relevant
exports.find = () => stories.find().toArray();

//10.Updating this to MongoDb to match the id with the id
//13. Convert to object ID type
exports.findById = id => stories.findOne({_id: new ObjectId(id)});

//15.Changing this to MongoDB
exports.save = story => stories.insertOne(story);

exports.updateById = (id, newStory) => stories.updateOne({_id: new ObjectId(id)}, 
                                                        {$set: {title: newStory.title, content: newStory.content}});

exports.deleteById = id => stories.deleteOne({_id: new ObjectId(id)});