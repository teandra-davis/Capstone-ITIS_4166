/*Teandra Davis, 01/19/2023*/
const courses = [{
    prefix: 'ITIS',
    id: 4166,
    title: 'Network based app development'
},
{
    prefix: 'ITIS',
    id: 4180,
    title: 'Mobile application development'
},
{
    prefix: 'ITCS',
    id: 4156,
    title: 'Intro to machine learning'
},
{
    prefix: 'ITCS',
    id: 3160,
    //'Database desgin'
    title: 'Database design'
}
];

//Returns a course that matches the id
function findById(id) {
    return courses.find(course => course.id === id);
}

//To do: implement save(course)
// Add the course to the array.
function save(course){
    courses.push(course)
}

/*Returns an array of all course objects whose prefix match the parameter. 
(Hint: use the filter() method)*/
function findByPrefix(prefix){
    return courses.filter(course => course.prefix.startsWith(prefix));
}

/*Updates the course object in the array whose id matches the parameter. 
The function returns true if the operation is successful, otherwise it returns false.*/
function updateById(id, course){
    const objIndex = courses.findIndex(x => x.id === id);
    if (objIndex != -1) {
        courses[objIndex] = course;
        return true;
    } else {
        return false;
    }
}


/*Removes the course object in the array whose id matches the parameter. 
The function returns true if the operation is successful, otherwise it returns false. 
(Hint: use the splice() method for removing elements from an array)*/
function removeById(id){
    const objIndex = courses.findIndex(x => x.id === id);
    if (objIndex != -1) {
        courses.splice(objIndex, 1);
        return true;
    } else {
        return false;
    }
}


//To do: uncomment the following testing code when you are ready to test your functions
save({ prefix: 'ITIS', id: 3310, title: 'Software architecture & design' });
save({ prefix: 'ITIS', id: 4250, title: 'Computer forensics' });
save({ prefix: 'ITIS', id: 4420, title: 'Usable security and privacy' });
console.log(courses);
console.log(" ")
console.log('FIND BY ID: ', findById(4166));
console.log('FIND BY PREFIX: ', findByPrefix('ITIS'));
console.log(removeById(4000)); //Should return false
console.log(updateById(4000)); //Should return false
console.log(updateById(4166, {
     prefix: 'ITIS',
    id: 4166,
    title: 'Network-based app development'
}, )); //Should return true
console.log(removeById(4420)); //Should return true
console.log(courses);