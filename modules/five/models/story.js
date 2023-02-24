const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');

const stories = [
    {
        id: '1',
        title: 'My life at Charlotte',
        content: 'Has been quite a struggle but rewarding at the least. Half of my college life has been online and during a global pandemic. Im graduating in May 2023',
        author: 'Teandra',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Learning NBAD',
        content: 'This class isnt that hard. I am learning valuable information. I am following the videos to finish each assignment for this course',
        author: 'Teandra',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'My Spring Break',
        content: 'I am going to Florida for Spring Break. This will be my last Spring Break. Spring Break is the last week of February, which doesnt seem like spring to me...',
        author: 'Teandra',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

//Implement a function that returns the array of stories
exports.find = function () {
    return stories;
}

//exports.find = () => stories;

exports.findById = id => stories.find(story => story.id === id);

//Add it to our array
exports.save = function (story) {
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory) {
    let story = stories.find(story => story.id === id);
    if(story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
    
};

exports.deleteById = function(id) {
    let index = stories.findIndex(story => story.id === id);
    if(index !== -1){
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
}