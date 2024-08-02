
const mongoose = require('mongoose');
let schemaClass = new mongoose.Schema({
    userName: {
        type: String,
         required: true,
        // default: 'John Doe',
        // unique: true,
        // index: true,
        // sparse: true,
        // validate: (value) => value.length > 3,
        // alias: 'full_name',
        // get: (value) => value.toUpperCase(),
        // set: (value) => value.toLowerCase()
    },
    email: {
        type: String,
         required: true,
        unique: true,
        
    },
    password: {
        type: String,
         required: true,
 
    }

});
module.exports = mongoose.model('User', schemaClass);