
exports.up = function(knex) {
    return knex.schema
      .createTable("Meetings", (tbl) => {
          tbl.increments("id").unique().notNullable();
          tbl.string("LeadEmail").notNullable();
          tbl.string("StartTime").notNullable();
          tbl.string("EndTime").notNullable();
          tbl.integer("Company").references("id").inTable("Companies").notNullable()
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("Meetings");
  };