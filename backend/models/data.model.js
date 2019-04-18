// mongoose = Object Data Modeling (ODM) library for MongoDB and Node.js
const mongoose = require('mongoose');
//schema is a validation from mongoose 
const Schema = mongoose.Schema;

// The DB data structure
const DataSchema = new Schema({
    name: { 
            title: {
                ES: String, 
                EN: String,
            }, 
            value: {type: String, required: true, max: 30} 
        },
        description: { 
            title: {
                ES: String,
                EN: String,
            }, 
            value: {
                ES: {type: String, required: true, max: 300}, 
                EN: {type: String, required: true, max: 300}
            }
        } 
    });

// Export the model
module.exports = mongoose.model('Data', DataSchema);