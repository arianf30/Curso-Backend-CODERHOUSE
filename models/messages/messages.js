const messages = [
    { author: 'Juan', message: '¡Hola! ¿Qué tal?' },
    { author: 'Pedro', message: 'Muy bien! ¿Y vos?' },
    { author: 'Ana', message: '¡Genial!' },
    { author: 'Arián', message: 'Saludos!' }
]

const getMessages = () => messages;

const saveMessage = (message) => {
    messages.push(message)
}

module.exports = {
    getMessages,
    saveMessage
}