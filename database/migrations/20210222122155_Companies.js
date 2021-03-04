
exports.up = function(knex) {
    return knex.schema
    .createTable("Companies", (tbl) => {
        tbl.increments("id").unique().notNullable();
        tbl.string("URL").unique().notNullable();
        tbl.string("Name");
        tbl.string("Contact");
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Companies");
};
