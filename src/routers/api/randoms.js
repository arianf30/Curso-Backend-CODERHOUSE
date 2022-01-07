import { Router } from 'express'
import getRandomInt from '../../utils/getRandomInt.js';

const DEFAULT_CANT = 100000000

const randomsApiRouter = new Router()

randomsApiRouter.get('/health', (req, res) => {
    res.json({ date: new Date().toLocaleString() })
})

randomsApiRouter.get('/api/randoms', (req, res) => {
    const { cant = DEFAULT_CANT } = req.query;
    const numbers = [];

    for (let index = 0; index < cant; index++) {
        const random = getRandomInt(1, 1001);
        numbers.push(random)
    }

    const result = {};
    numbers.forEach((number) => {
        if (result[number]) {
            result[number]++;
        } else {
            result[number] = 1
        }
    })

    res.json({ result })
})

export default randomsApiRouter