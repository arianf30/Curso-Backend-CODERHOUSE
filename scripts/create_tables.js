const { options } = require('../models/mysql');

const knex = require('knex')(options);

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    /* table.string('description')
    table.interger('code')
    table.decimal('price', 10, 2);
    table.interger('stock')
    table.string('thumbnail') */
})
    .then(() => console.log('Tabla de productos creada con éxito.'))
    .catch((error) => { console.log(error); throw error; })
    .finally(() => knex.destroy());