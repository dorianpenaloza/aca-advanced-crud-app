const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
var newDate = Date();
//Defines a model of what our database will look like.
const postSchema = new Schema({ //Makes a new instance of 'Schema'
    'user' : { type: String, required: true },
    'text' : { type: String, required: true },
    'updated' : { type: Date, default: Date }
});

module.exports = mongoose.model('Post', postSchema); //Tells 'mongoose' that we want to register a new model. It's a 'Post' model and it has this schema: 'postSchema'.
