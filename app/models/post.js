'use strict';

const Bookshelf = require('../middleware/bookshelf');
require('./user');
require('./comment');

const Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  },

  comments: function() {
    return this.hasMany('Comment');
  },

  constructor: function() {
    Bookshelf.Model.apply(this, arguments);

    this.on('destroying', function() {
      return this.fetch({
        withRelated: ['comments']
      }).then(post =>
        post.related('comments').invokeThen('destroy')
      );
    });
  }
});

module.exports = Bookshelf.model('Post', Post);
