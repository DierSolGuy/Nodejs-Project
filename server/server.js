// require a core node module --> http module
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//Creating a server using the http module
// we store the instance of the server for web sockets. but, generally we donot need that.
// It returns a callback function which has two parameters --> request and response
// 
const server = http.createServer((req, res) => {
    console.log('request made');
    console.log(req);
    console.log(req.url, req.method);

    //Lodash
    const num = _.random(0,100);
    console.log(num);

        //For a particular function that is allowed to run only once
    const greet = _.once(() => {
        console.log('Hello Aeonix');
    }); 

    greet();
    greet(); // As the function is allowed to run once so when this greet() is again called then it will not run.
    

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = '../views/';
    // Routing
    switch(req.url){
        case '/': 
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
                path += 'about.html';
                res.statusCode = 200;
                break;
        case '/about-me':   // Redirecting
                res.statusCode = 301;   //301 --> Resource removed
                res.setHeader('Location', '/about');
                break;
        default:
            path += '404 error.html';
            res.statusCode = 404;
            break;
    }
   // res.write('<head><center><link ref="styleset" href="https://www.google.co.in/"> Google</head>');
    // res.write('<a href="https://www.google.co.in/"><center>Google</a>');
    // //res.write('<a href="https://www.facebook.com/">Facebook</a>');
    // res.write('<h1><center> Hello Aeonix </h1>');
    // res.write('<h2><center> Lets grow up togather </h2>');
    // res.end();

    // sending an HTML file
    // reading a file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    });


});

// listen for request
server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port number: 3000');
});