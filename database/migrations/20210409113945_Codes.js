
exports.up = function(knex) {
    return knex.schema
      .createTable("Codes", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.integer("Code").unique().notNullable()
        tbl.integer("Email").references("Email").inTable("Companies").notNullable()
      })
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists("Codes");
};
