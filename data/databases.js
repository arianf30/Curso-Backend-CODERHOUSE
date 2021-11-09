const mysqlOptions = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'rootroot',
        database: 'arian_db'
    },
    pool: { min: 0, max: 7 }
};

const sqliteOptions = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
}

module.exports = {
    mysqlOptions,
    sqliteOptions
};