
const mongoose = require('mongoose');
let schemaClass = new mongoose.Schema({
    userName: {     type: String },
      firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: Number },
    gender: { type: String },
    panCardNumber: { type: String },
    mobileNumber:{type:Number},
    age:{type:Number},
    accountType:{type:String},
    bankAccount:{type:String},
    accountNumber:{type:Number},
    

});
module.exports = mongoose.model('AccountDetails', schemaClass);