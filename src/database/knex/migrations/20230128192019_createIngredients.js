exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();

    table.integer("plate_id").references("id").inTable("plates").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});
exports.down = knex => knex.schema.dropTable("ingredients");

