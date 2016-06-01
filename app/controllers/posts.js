'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Post = models.post;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Post.where({})
    .findAll()
    .then(posts => res.json({ posts }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Post.where({id: req.params.id})
    .fetch()
    .then(post => post ? res.json({ post }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let post = Object.assign(req.body.post, {
    _owner: req.currentUser._id,
  });
  Post.create(post)
    .then(post => res.json({ post }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Post.where(search)
    .fetch()
    .then(post => {
      if (!post) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return post.update(req.body.post)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Post.where(search)
    .fetch()
    .then(post => {
      if (!post) {
        return next();
      }

      return post.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });
