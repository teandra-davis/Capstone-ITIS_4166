const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');

const events = [
    {
        id: '1',
        title: 'The Atomic Dog',
        content: 'Super Tasty food',
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
]