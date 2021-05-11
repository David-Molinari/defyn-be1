
exports.up = function(knex) {
    return knex.schema
    .createTable("Companies", (tbl) => {
        tbl.increments("id").unique().notNullable();
        tbl.string("URL").unique().notNullable();
        tbl.string("Name").notNullable();
        tbl.string("Email").unique().notNullable();;
        tbl.string("Code").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Companies");
};