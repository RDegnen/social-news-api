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
});

module.exports = Bookshelf.model('Post', Post);
