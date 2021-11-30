const Contenedor = require('../../Contenedor');
const { normalizeMessages } = require('../../src/normalizar');
const mensajesContenedor = new Contenedor('./data/mensajes.json');

const getMessages = async () => {
    const messages = await mensajesContenedor.getAll();
    return normalizeMessages({id: 'messages', messages});
};

const saveMessage = async (message) => {
    await mensajesContenedor.save(message)
}

module.exports = {
    getMessages,
    saveMessage
}