const router = require('express').Router();
let User = require('../models/user.model.js');
const auth = require("../middleware/middleware");

// Normal route to get whole database
router.route('/').get(auth, async (req, res) => {
  try {
    let query = User.find();

    const filter = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments();
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    let result = await query;
    let filtered = result.filter(target => {
      if (filter.filter === "") {
        return target;
      }
      else if (target.name.toLowerCase().includes(filter.filter)){
        return target;
      }
      else if (target.email.toLowerCase().includes(filter.filter)){
        return target;
      }
    }).slice(skip, skip+pageSize);
    
    res.json({
      status: "success",
      filter,
      count: result.length,
      page,
      pages,
      data: filtered,
      original: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Server Error",
    });
  }
});

// Adding users to database
router.route('/add').post(auth, (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const role = req.body.role;

  const newUser = new User({email, name, role});

  newUser.save()
    .then(() => {
      res.json('User Added'); 
  })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete users from database
router.route('/:id').delete(auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.email = req.body.email;
      user.name = req.body.name;
      user.role = req.body.role;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;