
exports.up = function(knex) {
    return knex.schema
      .createTable("Users", (tbl) => {
          tbl.increments("id").unique().notNullable();
          tbl.string("Email").notNullable();
          // tbl.string("Username").notNullable();
          // tbl.string("Password").notNullable();
          tbl.integer("Company").references("id").inTable("Companies").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("Meetings");
  };