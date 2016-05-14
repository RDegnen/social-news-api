'use strict';

const bcrypt = require('bcrypt');
const bookshelf = require('../middleware/postgres');

const User = bookshelf.Model.extend({
  tableName: 'users'
});


//
// userSchema.methods.comparePassword = function (password) {
//   let _this = this;
//
//   return new Promise((resolve, reject) =>
//     bcrypt.compare(password, _this.passwordDigest, (err, data) =>
//         err ? reject(err) : data ? resolve(data) : reject(new Error('Not Authorized')))
//     ).then(() => _this);
// };
//
// userSchema.virtual('password').set(function (password) {
//   this._password = password;
// });
//
// userSchema.pre('save', function (next) {
//   let _this = this;
//
//   if (!_this._password) {
//     return next();
//   }
//
//   new Promise((resolve, reject) =>
//     bcrypt.genSalt(null, (err, salt) =>
//         err ? reject(err) : resolve(salt))
//   ).then((salt) =>
//     new Promise((resolve, reject) =>
//       bcrypt.hash(_this._password, salt, (err, data) =>
//         err ? reject(err) : resolve(data)))
//   ).then((digest) => {
//     _this.passwordDigest = digest;
//     next();
//   }).catch((error) => {
//     next(error);
//   });
// });
//
// userSchema.methods.setPassword = function (password) {
//   let _this = this;
//
//   return new Promise((resolve, reject) =>
//     bcrypt.genSalt(null, (err, salt) =>
//         err ? reject(err) : resolve(salt))
//   ).then((salt) =>
//     new Promise((resolve, reject) =>
//       bcrypt.hash(password, salt, (err, data) =>
//         err ? reject(err) : resolve(data)))
//   ).then((digest) => {
//     _this.passwordDigest = digest;
//     return _this.save();
//   });
// };

module.exports = User;