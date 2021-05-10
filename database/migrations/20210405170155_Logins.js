exports.up = function(knex) {
    return knex.schema
      .createTable("Logins", (tbl) => {
          tbl.increments("id").unique().notNullable();
          tbl.string("StartTime").notNullable();
          tbl.integer("User").references("id").inTable("Users").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("Logins");
  };