
exports.up = function(knex) {
    return knex.schema
      .createTable("UsersVideos", (tbl) => {
          tbl.string("User").references("id").inTable("User").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
          tbl.integer("Video").references("id").inTable("Video").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("UsersVideos");
  };
