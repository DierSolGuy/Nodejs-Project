// This is done for dynamic contents to display in browser by View Engine
// Express is a framework that helps us to easily manage routing, requests, server-side logic and responses in much more elegant way.
const express = require('express');
const morgan = require('morgan');



// Express App
const app = express(); // invoking the express() to create an instance of an express app.

// Register View Engine

app.set('view engine', 'ejs');
// If we want create new folder then we have to let express know about the HTML folder.
app.set('views', '../views2'); 

// Listen for requests
app.listen(3000); // we can store this in a constants if we want to reuse the server for web socket.

// Creating Custom Middleware - which will log to the console for every single request.
// imp: next() is used to let console know what to do after it fires the middleware

app.use( (req, res, next) => {
    console.log(' "New Request Made:" ');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Host: ', req.hostname);
    console.log('Method: ', req.method);
    console.log('Request Status Code: ', req.statusCode);
    console.log('Response Status Code: ', res.statusCode);
    next();
});

// Middleware & Static files(images, .css files, etc)
app.use(express.static('public'));

// Using 3rd party Middleware - morgan (for console logger)
app.use(morgan('dev'));
app.use(morgan('tiny'));





// Response to the request

app.get('/', (req, res) => {

    // send() infers the type of contents that we are trying to send to the browser and
    // send() automatically sets the content type header. EXM: res.setHeader('Content-Type', 'text/html');
    // send() method also infers the status code.

    //res.send('<h1><center> Hello Aeonix </h1>');

    // var path = require('path');
    //res.sendFile(path.resolve('../views/index.html'));
   
    //res.sendFile('../views/index.html', { root: __dirname }); // {root: __dirname} --> this parameter tells us about the root directory of the project.

    const blogs = [
        {title: 'Yoshi finds egg', snippet: 'Lorem Ipsum'},
        {title: 'Yoshi finds egg', snippet: 'Lorem Ipsum'},
        {title: 'Yoshi finds egg', snippet: 'Lorem Ipsum'},
    ];
    
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {

  // res.send('<h1><center> Hello Aeonix </h1>');
  // res.sendFile('../views/about.html', { root: __dirname });

//   var path = require('path');
//   res.sendFile(path.resolve('../views/about.html'));.

    // rendering the page
    res.render('about', { title: 'About_Us'});

});

// redirect

app.get('/aboutus', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render('createblog', { title: 'Create a Blog'});
});

// 404 error pages (Middleware)
// use() function is used create a middleware and fire middleware functions in express
// Use() function can be used for any incoming requests.
// use() fires for every single request.
// So 404 error part will at the bottom
app.use( (req, res) => {

    // var path = require('path');
    // res.status(404).sendFile(path.resolve('../views/404 error.html'));

    res.render('404', { title: '404' });
});