const options = {
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

module.exports = {
    options
};