
exports.up = function(knex) {
    return knex.schema
      .createTable("Meetings", (tbl) => {
          tbl.increments("id").unique().notNullable();
          tbl.string("LeadEmail").notNullable();
          tbl.string("LeadName").notNullable();
          tbl.string("LeadCompany").notNullable();
          tbl.string("StartTime").notNullable();
          tbl.string("EndTime").notNullable();
          tbl.integer("Company").references("id").inTable("Companies").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("Meetings");
  };