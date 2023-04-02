exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("id");
    table.varchar("title");
    table.varchar("category")
    table.varchar("description");
    table.varchar("imagem");
    table.varchar("price");
    table.varchar("ingredients")
    table.integer("favorited").default(0)

    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
})

exports.down = knex => knex.schema.dropTable("plates");
