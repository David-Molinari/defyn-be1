
exports.up = function(knex) {
    return knex.schema
      .createTable("Codes", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.integer("Code").unique().notNullable()
        tbl.string("Email").references("Email").inTable("Companies").notNullable()
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
      })
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists("Codes");
};
