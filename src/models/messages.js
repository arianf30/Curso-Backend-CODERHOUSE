const Contenedor = require('../../Contenedor');
const { sqliteOptions } = require('../../data/databases');
const mensajesContenedor = new Contenedor(sqliteOptions, 'messages');

const getMessages = async () => {
    const data = await mensajesContenedor.getAll();
    return data;
};

const saveMessage = async (message) => {
    const data = await mensajesContenedor.save(message);
    return data.id;
}

module.exports = {
    getMessages,
    saveMessage
}