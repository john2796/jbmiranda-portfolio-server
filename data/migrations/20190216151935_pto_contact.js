import knex from "knex";

exports.up = function(knex, Promise) {
  return knex.schema.createTable("contact", function(tbl) {
    tbl.increments();
    tbl.timestamps(true, true);
    tbal.string("name").notNullable();
    tbal.string("email").notNullable();
    tbal.string("message").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contact");
};
