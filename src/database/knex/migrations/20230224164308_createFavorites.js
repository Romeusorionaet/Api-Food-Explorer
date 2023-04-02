exports.up = knex => knex.schema.createTable("favorites", table => {
    table.integer('id');
    table.varchar("title");
    table.varchar("category")
    table.varchar("description");
    table.varchar("imagem");
    table.varchar("price");

    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
})

exports.down = knex => knex.schema.dropTable("favorites");
