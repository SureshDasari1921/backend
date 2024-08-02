
const mongoose = require('mongoose');
let schemaClass = new mongoose.Schema({
     
     
    bankAccount:{type:String},
    accountNumber:{type:Number},
    amount:{type:Number},
    creditDebit:{type:String},
    description:{type:String},
    transactionDate:{type:String},
    accountType:String,
    category:String
});
module.exports = mongoose.model('credit-debit-details', schemaClass);