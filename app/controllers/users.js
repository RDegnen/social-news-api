'use strict';

const debug = require('debug')('express-template:users');

const controller = require('lib/wiring/controller');
const models = require('app/models');
const User = models.user;

const crypto = require('crypto');

const authenticate = require('./concerns/authenticate');

const HttpError = require('lib/wiring/http-error');

const MessageVerifier = require('lib/wiring/message-verifier');

const encodeToken = (token) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY);
  return mv.generate(token);
};

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  );

const userFilter = { passwordDigest: 0, token: 0 };

const index = (req, res, next) => {
  User.where({}, userFilter)
    .fetchAll()
    .then(users => res.json({ users }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  User.where({id: req.params.id}, userFilter)
    .fetch()
    .then(user => user ? res.json({ user }) : next())
    .catch(err => next(err));
};

const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError' ?
      res.status(400).json({ error }) :
    next(error);

const signup = (req, res, next) => {
  let credentials = req.body.credentials;
  let user = { username: credentials.username, email: credentials.email,
               password: credentials.password };
  getToken().then(token =>
    user.token = token
  ).then(() =>
    new User(user).save()
  ).then(newUser => {
    delete user.token;
    delete user.passwordDigest;
    res.json({ newUser });
  }).catch(makeErrorHandler(res, next));

};

const signin = (req, res, next) => {
  let credentials = req.body.credentials;
  let search = { username: credentials.username };
  User.where(search).fetch()
    .then(user => {
      return user ? user.comparePassword(credentials.password) :
          Promise.reject(new HttpError(404));
  }).then(user =>
    getToken().then(token => {
      user.set({token: token});
      user.password = credentials.password;
      return user.save();
    })
  ).then(user => {
    user = user.attributes;
    delete user.passwordDigest;
    user.token = encodeToken(user.token);
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

const signout = (req, res, next) => {
  getToken().then(token =>
    User.where({
      _id: req.params.id,
      token: req.currentUser.token,
    }, {
      token,
    })
  ).then((user) =>
    user ? res.sendStatus(200) : next()
  ).catch(next);
};

const changepw = (req, res, next) => {
  debug('Changing password');
  User.where({
    id: req.params.id,
    token: req.currentUser.token,
  })
  .fetch()
  .then(user => {
    return user ? user.comparePassword(req.body.passwords.old) :
      Promise.reject(new HttpError(404));
  }).then(user => {
    user.password = req.body.passwords.new;
    return user.save();
  }).then((/* user */) =>
    res.sendStatus(200)
  ).catch(makeErrorHandler(res, next));
};

module.exports = controller({
  index,
  show,
  signup,
  signin,
  signout,
  changepw,
}, { before: [
  { method: authenticate, except: ['signup', 'signin'] },
], });
