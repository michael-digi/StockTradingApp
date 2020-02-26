const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    cash: {
      type: Number,
      default: 5000
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    stocks: {
      type: Map,
      default: {}
    },
    transactions: {
      type: Array,
      default: []
    }
});
// authenticate input against database documents
// UserSchema.statics.authenticate = (email, password) => {
//   User.findOne({ email: email })
//       .exec(function (user, error) {
//         if (error) {
//           return res.send(error);
//         } else if ( !user ) {
//           const err = new Error('User not found.');
//           err.status = 401;
//           return res.send(err);
//         }})
//         bcrypt.compare(password, user.password) = (error, result) => {
//           if (result === true) {
//             return res.send(user);
//           } else {
//             return res.send("Invalid Username and Password");
//           }
//         }
//     }
// hash password before saving to database
UserSchema.pre('save', function(next) {
  if (this.isModified('password')){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })} else {
    next()
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;