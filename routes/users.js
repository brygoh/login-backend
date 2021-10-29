const router = require('express').Router();
let User = require('../models/user.model.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Normal route to get whole database
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Adding users to database
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const role = req.body.role;

  const newUser = new User({email, name, role});

  const token = jwt.sign(
    {data: req.body},
    process.env.JWT_SECRET
  )
  newUser.token = token;

  // res.cookie('jwt', token);

  newUser.save()
    .then(() => {
      res.json(token); 
  })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete users from database
router.route('/:id').delete((req, res) => {

  // const token = req.cookies.jwt;
  // console.log(token);
  // jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
  //   if (err) {
  //     console.log(err.message);
  //   }
  //   else {
  //     console.log(decodedToken);
  //   }
  // })

  User.findById(req.params.id)
    .then(user => {
      jwt.verify(user.token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        }
        else {
          User.findByIdAndDelete(req.params.id)
            .then(() => res.json('User deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.email = req.body.email;
      user.name = req.body.name;
      user.role = req.body.role;

      jwt.verify(user.token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        }
        else {
          user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;