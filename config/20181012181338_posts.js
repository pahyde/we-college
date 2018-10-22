
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.text('user');
        table.text('title');
        table.text('description');
        table.text('program');
        table.text('category');
        table.integer('likes');
        table.integer('comments');
        table.datetime('created');
        table.datetime('updated');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('posts');
};
