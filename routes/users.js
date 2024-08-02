var express = require('express');
var router = express.Router();
var Profile = require("../schema/profileSchema")
var Account = require("../schema/acoountSchema")
var CreditDebit = require("../schema/depositCreditSchema")
var transactionHistory = require("../schema/transactionHistory")
/* GET users listing. */
router.post('/updateProfile', async function (req, res) {

  const { userName, email, firstName, lastName, address, city, country, postalCode, aboutMe } = req.body

  let findByMail = await Profile.findOne({ email: email });

  if (!findByMail) {
    try {
      let profileData = new Profile({ userName: userName, email: email, firstName: firstName, lastName: lastName, address: address, city: city, country: country, postalCode: postalCode, aboutMe: aboutMe })
      console.log("enter")
      await profileData.save().then((resp) => {

        res.status(200).json({ message: "Profile Saved Successfully", data: resp })
      }).catch((err) => {
        res.status(400).json({ data: err.message })
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  else {
    try {
      Profile.updateOne({ email: email }, { firstName: firstName, lastName: lastName, address: address, city: city, country: country, postalCode: postalCode, aboutMe: aboutMe }).then((resp) => {
        res.status(200).json({ message: "Profile Updated Successfully", data: resp })
      }).catch((err) => {
        res.status(400).json({ data: err.message })
      })
    }
    catch (e) {
      console.log(e)
    }
  }

});

router.post('/getProfile', function (req, res) {

  Profile.findOne({ email: req.body.email }).then((resp) => {
    res.status(200).json({ data: resp })
  }).catch((err) => {
    res.status(400).json({ data: err.message })
  })


});






module.exports = router;
