const router = require('express').Router();
let User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

router.route('/').post(async (req, res) => {
    const email = req.body.email;
    const token = req.get('Authorization');

    const ticket = await client.verifyIdToken({
        idToken: token.split(' ')[1],
        audience: process.env.CLIENT_ID
    });

    console.log(ticket)

    if (ticket) {
        let search = await User.findOne({'email':email})

        if (search) {
            console.log('SUCCESS')
            res.json({
                verify:ticket.getPayload('email_verified'),
                token:jwt.sign({data:search}, process.env.JWT_SECRET),
                admin:search.role
            });
        }
        else {
            console.log('FAILURE')
            res.json({
                admin:'DONOTEXIST'
            });
        }
    }
    else {
        console.log('FAILURE')
        res.json({
            admin:'DONOTEXIST'
        });
    }
})

module.exports = router;
