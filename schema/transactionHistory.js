
const mongoose = require('mongoose');
let schemaClass = new mongoose.Schema({
     
     transactionHistory:Object
    
    
});
module.exports = mongoose.model('transaction-history', schemaClass);