
exports.up = function(knex) {
    return knex.schema
    .createTable("Media", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.string("Name").notNullable()
        tbl.string("Link").notNullable()
        // tbl.boolean("Unpaid").notNullable()
        tbl.integer("Company").references("id").inTable("Companies").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Media");
  };
  