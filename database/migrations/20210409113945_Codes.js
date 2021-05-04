
exports.up = function(knex) {
    return knex.schema
      .createTable("Codes", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.string("Code").unique().notNullable()
        tbl.string("Email").references("Email").inTable("Companies").unique().notNullable()
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
      })
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists("Codes");
};
