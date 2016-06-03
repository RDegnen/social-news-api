'use strict';

const Bookshelf = require('../middleware/bookshelf');
require('./user');

const Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Post', Post);
