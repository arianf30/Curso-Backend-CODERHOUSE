/**
 * 
 * @param {number} min incluido
 * @param {number} max excluido
 * @returns {number} random number
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min))
}

export default getRandomInt