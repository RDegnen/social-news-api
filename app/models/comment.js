'use strict';

const Bookshelf = require('../middleware/bookshelf');
require('./user');
require('./post');

const Comment = Bookshelf.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  },

  post: function() {
    return this.belongsTo('Post');
  },

  comments: function() {
    return this.hasMany(Comment);
  },

  comment: function() {
    return this.belongsTo(Comment);
  }
});

module.exports = Bookshelf.model('Comment', Comment);
