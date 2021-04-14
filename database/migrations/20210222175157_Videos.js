
exports.up = function(knex) {
    return knex.schema
    .createTable("Videos", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.string("Name").notNullable()
        tbl.string("Link").notNullable()
        tbl.string("Price").notNullable()
        tbl.integer("Company").references("id").inTable("Companies").notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Videos");
};
