var express = require('express');
var router = express.Router();
var Profile = require("../schema/profileSchema")
var Account = require("../schema/acoountSchema")
var CreditDebit = require("../schema/depositCreditSchema")
var transactionHistory = require("../schema/transactionHistory")





router.post('/createAccount', async function (req, res) {
    console.log("type", req.body.accountType)
    try {
        const data = await Account.findOne({ accountType: req.body.accountType })
        console.log(data)
        if (!data) {

            let accountData = new Account(req.body)

            await accountData.save().then(async (resp) => {
                await new CreditDebit({ accountNumber: req.body.accountNumber,amount:0, accountType: req.body.accountType }).save()
                res.status(200).json({ message: "Account  Created Successfully", data: resp })
            }).catch((err) => {
                res.status(400).json({ data: err.message })
            })
        }
        else {
            res.status(402).json("Account Already Exists")
        }
    }
    catch (e) {
        console.log(e)
    }

});
router.get('/getAccount', async function (req, res) {

    try {

        await Account.find().then((resp) => {

            res.status(200).json(resp)
        }).catch((err) => {
            res.status(400).json({ data: err.message })
        })
    }
    catch (e) {
        console.log(e)
    }

});
router.post('/fetchBankDetails', async function (req, res) {

    try {

        await Account.findOne({ bankAccount: req.body.bankAccount, accountType: req.body.accountType }).then((resp) => {

            if (resp) res.status(200).json(resp)
            else res.status(400).json("Account Doesn't Exist")
        }).catch((err) => {
            res.status(400).json({ data: err.message })
        })
    }
    catch (e) {
        console.log(e)
    }

});
router.delete('/deleteAccount/:accountNumber', async function (req, res) {
   
    try {

        await Account.deleteOne({ accountNumber: req.params.accountNumber }).then(async (resp) => {
            await CreditDebit.deleteOne({  accountNumber: req.params.accountNumber })
            await transactionHistory.deleteMany({ 'transactionHistory.accountNumber': req.params.accountNumber });
            res.status(200).json(resp)
        }).catch((err) => {
            res.status(400).json({ data: err.message })
        })
    }
    catch (e) {
        console.log(e)
    }

});


router.put('/updateAccount', async function (req, res) {

    const body = JSON.parse(JSON.stringify(req.body))
    delete body.accountNumber
    delete body._id

    try {

        await Account.updateOne({ accountNumber: req.body.accountNumber }, { ...body }).then((resp) => {

            res.status(200).json("Account Updated Successful ")
        }).catch((err) => {
            res.status(400).json({ data: err.message })
        })
    }
    catch (e) {
        console.log(e)
    }

});

 

module.exports = router;