<<<<<<< HEAD
const { mysqlOptions, sqliteOptions } = require('../data/databases');

const knexMysql = require('knex')(mysqlOptions);
const knexSqlite = require('knex')(sqliteOptions);

knexMysql.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    table.string('description')
    table.integer('code')
    table.decimal('price', 10, 2);
    table.integer('stock')
    table.string('thumbnail')
})
    .then(() => console.log('Tabla de productos creada con éxito.'))
    .catch((error) => { console.log(error); throw error; })
    .finally(() => knexMysql.destroy());

knexSqlite.schema.createTable('messages', table => {
    table.increments('id')
    table.string('name')
    table.string('message')
})
    .then(() => console.log('Tabla de mensajes creada con éxito.'))
    .catch((error) => { console.log(error); throw error; })
    .finally(() => knexSqlite.destroy());
=======
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
>>>>>>> refs/remotes/backendd/desafio_7
