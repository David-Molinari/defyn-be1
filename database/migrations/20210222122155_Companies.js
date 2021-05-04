
exports.up = function(knex) {
    return knex.schema
    .createTable("Companies", (tbl) => {
        tbl.increments("id").unique().notNullable();
        tbl.string("URL").unique().notNullable();
        tbl.string("Name").notNullable();
        tbl.string("Email").unique().notNullable();
        // tbl.string("StripeID").notNullable();
        tbl.string("Order").notNullable();
        // tbl.string("Price").notNullable();
        // tbl.bytea("Logo")
        // tbl.string("Color1")
        // tbl.string("Color2")
        // tbl.string("Font")
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Companies");
};
