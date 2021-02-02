const people = ['Sourish', 'Rahul', 'Rambo', 'Arijit'];
const ages = [20, 30, 40];


console.log(people);

// For exporting some things or some modules from this file, we have to export it manually.
// For exporting multiple objects.

module.exports = {
    people, ages
}; 

// For accessing the things of the people.js file, we have to manually export that file