// This is done for dynamic contents to display in browser by View Engine
// Express is a framework that helps us to easily manage routing, requests, server-side logic and responses in much more elegant way.
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); //requiring Mongoose 
const Blog = require('../models/blog');

// Express App
const app = express(); // invoking the express() to create an instance of an express app.

// Connnecting the database - MongoDB
const dbURL = 'mongodb+srv://sourish:test1234@nodejs.pitq4.mongodb.net/Nodejs?retryWrites=true&w=majority';
// Mongoose will be used to connect and interact with the database.
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }) // {useNewUrlParser: true, useUnifiedTopology: true} --> This parameter will stop the  Deprecation Warning
    .then( (result) => {
        console.log('Connected to Database', result);
        // Listen for requests (We are listening to the request only if the database is connected)
        app.listen(3000); // we can store this in a constants if we want to reuse the server for web socket.
    })
    .catch( err => console.log('Error:', err));

// Register View Engine

app.set('view engine', 'ejs');
// If we want create new folder then we have to let express know about the HTML folder.
app.set('views', '../views2'); 


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

// This middleware is used for accepting form data from POST request 
app.use(express.urlencoded({ extended: true }));

// Using 3rd party Middleware - morgan (for console logger)
app.use(morgan('dev'));
app.use(morgan('tiny'));

// mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
    // creating new instance of the blog
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    });

    // Saving the blog content inside collection (MongoDB) --> This is Asynchronous task (it returns a promise).
    blog.save()
        .then( result => res.send(result) )
        .catch( err => console.log(err) );
});

// Retrieve all the blogs from collection
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then( result => res.send(result))
        .catch( err => console.log(err));
});

// Finding a single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('6013132fbdd1061e742029d3')
     .then( result => res.send(result))
     .catch( err => console.log(err));
}); 


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
    
    //res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
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

// Blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort( { createdAt : -1 })
        .then( (result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
            console.log('New Blogs');
        })
        .catch( err => console.log(err));
});

// POST handler
app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then( result => res.redirect('/blogs'))
        .catch( err => console.log( err ));

});

// Getting a request of single blog
app.get('/blogs/:id', (req, res) => {
    // Extracting :id property
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then( result => res.render('details', { blog: result, title: ' Blog Details '}))
        .catch( err => console.log(err));
});

// Handling Delete request
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then( result => {
        // ajax request cannot be redirect by Nodejs. So we have to send either json or text data and that json data can have a redirect property.
        res.json({ redirect: '/blogs' }) 
    })
    .catch( err => console.log(err) );
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