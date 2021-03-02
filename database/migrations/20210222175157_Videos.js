
exports.up = function(knex) {
    return knex.schema
    .createTable("Videos", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.string("Name")
        tbl.string("Link")
        tbl.string("Alt")
        tbl.integer("Company").references("id").inTable("Companies").notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Videos");
};
