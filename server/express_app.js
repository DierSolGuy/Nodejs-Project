// Express is a framework that helps us to easily manage routing, requests, server-side logic and responses in much more elegant way.
const express = require('express');

// Express App
const app = express(); // invoking the express() to create an instance of an express app.

// Register View Engine

//app.set('view engine', 'ejs');
// If we want create new folder then we have to let express know about the HTML folder.
//app.set('views', 'views2'); 

// Listen for requests
app.listen(3000); // we can store this in a constants if we want to reuse the server for web socket.

// Response to the request

app.get('/', (req, res) => {

    // send() infers the type of contents that we are trying to send to the browser and
    // send() automatically sets the content type header. EXM: res.setHeader('Content-Type', 'text/html');
    // send() method also infers the status code.

    //res.send('<h1><center> Hello Aeonix </h1>');
    var path = require('path');
    res.sendFile(path.resolve('../views/index.html'));
    //res.sendFile('../views/index.html', { root: __dirname }); // {root: __dirname} --> this parameter tells us about the root directory of the project. 
});

app.get('/about', (req, res) => {

  // res.send('<h1><center> Hello Aeonix </h1>');
  // res.sendFile('../views/about.html', { root: __dirname });
  var path = require('path');
  res.sendFile(path.resolve('../views/about.html'));

});

// redirect

app.get('/aboutus', (req, res) => {
    res.redirect('/about');
});

// 404 error pages
// use() function is used create a middleware and fire middleware functions in express
// Use() function can be used for any incoming requests.
// use() fires for every single request.
// So 404 error part will at the bottom
app.use( (req, res) => {
    var path = require('path');
    res.status(404).sendFile(path.resolve('../views/404 error.html'));
});