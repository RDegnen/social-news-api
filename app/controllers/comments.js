'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Post = models.post;
const User = models.user;
const Comment = models.comment;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Comment.where({})
    .fetchAll()
    .then(comments => res.json({ comments }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Comment.where({id: req.params.id})
    .fetch()
    .then(comment => comment ? res.json({ comment }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let comment = req.body;
  comment.user_id = req.currentUser.id;
  comment.post_id = req.params.postId;
  comment.comment_id = req.params.commentId;
  new Comment(comment)
    .save()
    .then(comment => res.json({ comment }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { id: req.params.id, user_id: req.currentUser.id };
  Comment.where(search)
    .fetch()
    .then(comment => {
      if (!comment) {
        return next();
      }

      delete req.body.user_id;  // disallow owner reassignment.
      return comment.save(req.body)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { id: req.params.id, user_id: req.currentUser.id };
  Comment.where(search)
    .fetch()
    .then(comment => {
      if (!comment) {
        return next();
      }

      return comment.destroy()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const setCommentsByAuthor = (req, res, next) => {
  let ownerId = req.params.id;
  User.where({id: ownerId})
    .fetch({withRelated: ['comments']})
    .then((user) => {
      res.json((user.related('comments')));
    }).catch(err => next(err));
};

const setCommentsByPost = (req, res, next) => {
  let postId = req.params.id;
  Post.where({id: postId})
    .fetch({withRelated: ['comments']})
    .then((post) => {
      res.json((post.related('comments')));
    }).catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  setCommentsByAuthor,
  setCommentsByPost,
}, { before: [
  { method: authenticate, except: ['index', 'show', 'setCommentsByAuthor', 'setCommentsByPost'] },
], });
