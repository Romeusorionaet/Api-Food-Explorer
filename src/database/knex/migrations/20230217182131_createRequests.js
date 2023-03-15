exports.up = knex => knex.schema.createTable("requests", table => {
    table.varchar("title");
    table.varchar("category");
    table.varchar("description");
    table.varchar("imagem");
    table.varchar("price");
    table.varchar("amount");

    table.integer("plate_id").references("id").inTable("plates").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
})

exports.down = knex => knex.schema.dropTable("requests");