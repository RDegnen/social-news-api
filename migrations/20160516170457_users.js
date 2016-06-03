'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable( 'users', function ( table ) {
    table.increments('id').primary();
    table.string('email').unique();
    table.string('token');
    table.string('passwordDigest').notNullable();

    table.timestamps();
  }).then(() => {
    console.log('users table created');
  }).catch(console.error);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
    .then(() => {
      console.log('users table dropped');
    }).catch(console.error);
};
