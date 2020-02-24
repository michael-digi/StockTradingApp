const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    
    userId: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    
    transactions: {
      type: Map,
      default: {}
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
// UserSchema.pre('save', function(next) {
//   const user = this;
//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });

const Transaction = mongoose.model('Transaction', UserSchema);
module.exports = Transaction;