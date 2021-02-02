// Importing people.js file into module.js file by require()
// ./ --> means file is on same directory
// For accessing the required properties from other files by "const {people, ages} = require('./people');"
 

const {people, ages} = require('./people');


console.log(people, ages);

// Operating System file is already in Node modules
// OS file is already built in node modules. So, we can directly access it.
const os = require('os');
console.log(os);
console.log(os.platform(), os.homedir());
