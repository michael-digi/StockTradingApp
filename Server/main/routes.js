const express = require('express');
const router = express.Router();
const User = require('../models/user');

registerUser = (req, res, next) => {
  console.log(req.body)
  if (req.body.email &&
      req.body.firstName && 
      req.body.lastName &&
      req.body.password) {

      // confirm that user typed same password twice
      // if (req.body.password !== req.body.confirmPassword) {
      //   const err = new Error('Passwords do not match.');
      //   err.status = 400;
      //   return next(err);
      // }

      // create object with form input
    const userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    
    User.findOne({ email: userData.email })
      .then((response) => {
        if (response) {
          const err = new Error()
          err.status = 409;
          err.message = "This user already exists"
          
          return res.send(err)
        }
        else {
          User.create(userData)
            .then((user, error) => {
              req.session.userId = user._id;
              console.log(req.session.userId, " this is req.session.userId")
              console.log(req.session, " this is req.session")
              res.send(req.session.userId) })
            .catch(error => console.log(error))
        }
      })
  }
     
  else {
      const err = new Error();
      err.status = 400;
      err.message = "All fields required"
      
      return res.send(err);
    }
}


router.post('/register', registerUser)

module.exports = router