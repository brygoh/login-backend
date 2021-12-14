const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.get('Authorization')
    
    if (authHeader) {
        jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(400).json('Error: ' + err);
            }
            else {
                next()
            }
        }) 
    }
    else {
        res.status(400).json('Error: ' + err);
    }
  }

  module.exports = authenticateToken;