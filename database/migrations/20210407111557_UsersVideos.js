
exports.up = function(knex) {
    return knex.schema
      .createTable("UsersVideos", (tbl) => {
          tbl.string("User").references("id").inTable("User").notNullable()
          tbl.integer("Video").references("id").inTable("Video").notNullable()
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("UsersVideos");
  };
