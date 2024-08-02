
var express = require('express');
var router = express.Router();
var Profile = require("../schema/profileSchema")
var Account = require("../schema/acoountSchema")
var CreditDebit = require("../schema/depositCreditSchema")
var transactionHistory = require("../schema/transactionHistory")

router.post('/deposit-withdraw', async function (req, res) {

    try {
        const data = await CreditDebit.findOne({ accountNumber: req.body.accountNumber })
        req.body['amount'] = parseFloat(req.body.amount)
        if (!data) {
            let creditDebitData = new CreditDebit(req.body)
            await creditDebitData.save().then(async (resp) => {
                await new transactionHistory({ transactionHistory: req.body }).save()
                if (resp.creditDebit == 'Credit') res.status(200).json("Amount  Credit Successfully")
                else res.status(200).json("Amount  Debited Successfully")
            }).catch((err) => {

                res.status(400).json({ data: err.message })
            })
        }
        else {
           
            const body = JSON.parse(JSON.stringify(req.body))
            delete body.accountNumber
            delete body._id
            let amt

            if (req.body.creditDebit == 'Credit') amt = Number(data.amount) + Number(req.body.amount)
            if (req.body.creditDebit == 'Debit') amt = Number(data.amount) - Number(req.body.amount)
            body['amount'] = amt
            await CreditDebit.updateOne({ accountNumber: req.body.accountNumber }, { ...body }).then(async (resp) => {
                await new transactionHistory({ transactionHistory: req.body }).save()
                if (req.body.creditDebit == 'Credit') res.status(200).json("Amount  Credit Successfully")
                else res.status(200).json("Amount  Debited Successfully")
            }).catch((err) => {
                console.log(err.message)
                res.status(400).json({ data: err.message })
            })

        }
    }
    catch (e) {
        console.log(e)
    }

});
router.get('/getTransactionDetails', function (req, res) {

    transactionHistory.find().then((resp) => {
        for (const iterator of resp) {
            const date = new Date(iterator.transactionHistory.transactionDate);

            // Example: Convert to local date and time string
            const localDateString = date.toLocaleString();
            iterator.transactionHistory.transactionDate=date.toLocaleString();
             
        }
        res.status(200).json(resp)
    }).catch((err) => {
        res.status(400).json("Unable To Fetch")
    })


});
router.get('/getTotalAmountsByAllAccounts', function (req, res) {

    CreditDebit.find().then((resp) => {
        res.status(200).json(resp)
    }).catch((err) => {
        res.status(400).json("Unable To Fetch")
    })


});

module.exports = router;