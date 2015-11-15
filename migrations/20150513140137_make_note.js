'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', function(table) {
    table.increments('id');
    table.text('name');
  }).then(function() {
    return knex.schema.createTable('user', function(table) {
      table.increments('id');
      table.text('user_id');
      table.text('user_pw');
      table.text('user_name');
      table.timestamps();
    }).then(function() {
      return knex.schema.createTable('note', function(table) {
        table.increments('id');
        table.text('title');
        table.text('content');
        table.integer('group_id').references('id').inTable('group');
        table.timestamps();
      });
    });
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('note').then(function() {
    return knex.schema.dropTable('user').then(function() {
      return knex.schema.dropTable('group')
    });
  });
};
