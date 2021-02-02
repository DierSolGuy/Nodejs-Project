// Global Object

console.log(global);

setTimeout(() => {
    console.log('In the timeout');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('In the Interval');
}, 2000);

// Two Properties of Nodejs
// 1. dirname (Directory Name)
// 2. filename

console.log(__dirname);
console.log(__filename);

