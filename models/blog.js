const mongoose = require('mongoose');
// Schema is a type of constructor
const Schema = mongoose.Schema; // Schema defines the structure of the documents that we are like to store inside a collection.

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true        
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Models surrounds the Schema and then provides us the interface by which to communicate with the database collection for that document type.
//mongoose.model('Blog' --> This parameter will pluralize the content and search inside the collection inside the database. Exm: Blog will become blogs);
// mongoose.model('Blog'--->This will be the singular of the collection name.
// mongoose.model('<Singular form of the collection name>', Schema --> What type of object we want to store inside the collection)
const Blog = mongoose.model('Blog', blogSchema);

// Exporting the model
module.exports = Blog;
