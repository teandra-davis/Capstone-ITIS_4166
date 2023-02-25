const { DateTime } = require('luxon');

const events = [
    {
        id: '1',
        title: 'The Atomic Dog',
        category: "American",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: '2023/02/27 19:00',
        endDate: '2023/02/28 19:00',
        details: 'Super tasty food!',
        image: 'images/Most-Popular-American-Foods.webp'
    },
    {
        id: '2',
        title: 'Blue lagoon Cafe',
        category: "American",
        hostName: "John Doe",
        location: "University City",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/American-Food-Icons-Social-IMG.jpg'
    },
    {

        id: '3',
        title: 'KingTuts Hot Dog Palace',
        category: "American",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/American-Food-Icons-Social-IMG.jpg'
    },
    {

        id: '4',
        title: 'Samoha African Cuisine',
        category: "African",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/American-Food-Icons-Social-IMG.jpg'
    },
    {

        id: '5',
        title: 'Jolof on Wheels',
        category: "African",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/American-Food-Icons-Social-IMG.jpg'
    }, 
    {

        id: '6',
        title: 'The Cooking Pot',
        category: "African",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/Most-Popular-American-Foods.webp'
    }, 
    {

        id: '7',
        title: 'Katsu Kart',
        category: "Asian",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: ''
    }, 
    {

        id: '8',
        title: 'Hawkers Asian Street Food',
        category: "Asian",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: 'July 13th, 2023 11AM',
        endDate: 'July 13th, 2023 2PM',
        details: 'Super tasty food!',
        image: 'images/Most-Popular-American-Foods.webp'
    },
    {

        id: '9',
        title: 'Halal Food Cart',
        category: "Asian",
        hostName: "John Doe",
        location: "WT Harris",
        //DateTime Create MVC Components/Models
        startDate: '2023/02/27 19:00',
        endDate: '2023/02/28 19:00',
        details: 'Super tasty food!',
        image: 'images/Most-Popular-American-Foods.webp'
    }
];

let counter = events.length; // initialize the counter with the length of the events array

//Return a list of stories to the controller
exports.find = function() {
    return events;
};

exports.findById = function(id) {
    return events.find(event=>event.id === id);
};

exports.save = function(event) {
    counter++;
    event.id = counter.toString();
    events.push(event);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if (event) {
        event.title = newEvent.title;
        event.details = newEvent.details;
        event.category = newEvent.category;
        event.hostName = newEvent.hostName;
        event.location = newEvent.location;
        event.startDate = newEvent.startDate;
        event.endDate = newEvent.endDate;
        event.image = newEvent.image;
        return true;
    } else {
        return false;
    }  
};

exports.deleteById = function(id) {
    let index = events.find(event=>event.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
};