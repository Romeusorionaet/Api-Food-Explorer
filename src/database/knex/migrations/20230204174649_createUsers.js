exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.varchar("password");
    table.boolean("admin");
})

exports.down = knex => knex.schema.dropTable("users");
