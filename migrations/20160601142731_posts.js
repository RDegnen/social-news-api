'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable( 'posts', function ( table ) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('user_id').references('users.id');

    table.timestamps();
  }).then(() => {
    console.log('posts table created');
  }).catch(console.error);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
    .then(() => {
      console.log('posts table dropped');
    }).catch(console.error);
};
