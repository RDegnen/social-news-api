'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.text('content').notNullable();
    table.integer('user_id').references('users.id')
    table.integer('post_id').references('posts.id').notNullable();
    table.integer('comment_id').references('comments.id');

    table.timestamps();
  }).then(() => {
    console.log('commments table created');
  }).catch(console.error);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
    .then(() => {
      console.log('comments table dropped');
    }).catch(console.error);
};
