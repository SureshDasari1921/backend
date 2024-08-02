var express = require('express');
var path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 var connectDB=require('./dbconnection')
 connectDB()
 var app = express();
 
 app.use(express.static(path.join(__dirname, 'build')));
//run npm run build in react command it will generate one build folder 
 app.get(['/','/register'], function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });


  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}))
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
 var authenticationRouter=require('./routes/authentication')
 var debitCreditRouter=require('./routes/debitCredit');
 var accountDetailsRouter=require('./routes/accountDetails');

app.use('/auth', authenticationRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/debit-credit', debitCreditRouter);
app.use('/accountDetails', accountDetailsRouter);
app.use(bodyParser.urlencoded({  
    extended: false
}));
 
 
 
app.listen('3001', () => {
    console.log('listen port number on 3001')
})
 
module.exports = app
