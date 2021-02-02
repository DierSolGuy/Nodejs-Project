// The core module to interact with file system is to import FS module 
// fs module is already built in Node
// Whenever we write a asynchronous function it will fire a callback function

// Creating a File
const fs = require('fs');
const { isBuffer } = require('util');

// reading files
// <filename>.readFile('<Relative_Path_Name>', <Function>);
// This method is asynchronous. So it will take sometime to do for that it will not block the code(Non-blocking).
// After reading the files, we get a buffer. (Buffer is basically a package of data that is sent when we read this file.)

fs.readFile('../docs/blogs.txt', (err, data) => {
     if(err){
         console.log(err);
    }
     console.log(data); // will give output the buffer data.
     console.log(data.toString()); // will give output the actual text files.
 });

 console.log('Last line of codes');

// Writing files
// This method is asynchronous. So it will take sometime to do for that it will not block the code(Non-blocking).
// writeFile() has three arguments 
// 1. Relative path to the file we want to write to.
// 2. Text we actually want to write.
// 3. Callback Function (this is because when this section of code will get finished, then this callback function will run)

 fs.writeFile('../docs/blogs.txt', 'Hello Sourish! you have successfully edited the code', () => {
     console.log('You have successfully written the file');
 });

// // If the file in which we want to write doesnot exists, then compiler will create that file.
fs.writeFile('../docs/files.txt', 'Hello Sourish! you have successfully edited the code', () => {
     console.log('You have successfully written the file');
 });


// Directories
//mkdir() has two parameters
//1. directory name and path
//2. Callback Function
// If the directory already exists then it will give an error
// So for that if will write a synchronous code
// existsSync() --> Synchronous function and will only run if the condition satisfies

if (!fs.existsSync('../assets')){
    fs.mkdir('../assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Folder Created');
    });
}
else {
    fs.rmdir('../assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Folder Deleted');
    })
}


// *Deleting files*
// For deleting a file, we use unlink() function
// unlink() is asynchronous function

if(fs.existsSync('../docs/deleteme.txt')){
    fs.unlink('../docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Files Deleted');
    });
}