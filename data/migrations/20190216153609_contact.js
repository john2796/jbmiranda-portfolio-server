exports.up = function(knex, Promise) {
  return knex.schema.createTable("contact", function(tbl) {
    tbl.increments(); //primary key
    tbl.timestamps(true, true);
    tbl.string("name").notNullable();
    tbl.string("email").notNullable();
    tbl.string("message").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contact");
};
