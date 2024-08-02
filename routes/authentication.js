var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const secretKey = crypto.randomBytes(32).toString('hex');
var user = require('../schema/userSchema')
 

router.post('/register', async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let savedData = new user({ userName: req.body.userName, email: req.body.email, password: hashedPassword })
    savedData.save().then((resp) => {
        res.status(200).json({ message: 'Register successfull', data: resp })
    }).catch((e) => {
        res.status(400).json({ message: e.message })
    })

});
router.post('/login', function (req, res) {
 
    user.findOne({ email: req.body.email }).then(async (resp) => {
        if(!resp) return  res.status(401).json({ message: 'Invalid Email ID'  })
        let verifyPassword = await bcrypt.compare(req.body.password, resp.password)
      
        if (verifyPassword) {
            const token = jwt.sign({ email:resp.email,userName:resp.userName }, secretKey, { expiresIn: '1h', });
            return  res.status(200).json({ message: 'login successfull', token: token })
        }

        else res.status(401).json({ message: 'Invalid Credentials' })
    }).catch((err) => {
        res.status(400).json({ message: err.message })
    })

});

module.exports = router;
