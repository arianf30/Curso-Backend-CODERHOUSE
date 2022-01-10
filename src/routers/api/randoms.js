import { Router } from 'express'
import { fork } from 'child_process'


const DEFAULT_CANT = 100000000

const randomsApiRouter = new Router()

randomsApiRouter.get('/health', (req, res) => {
    res.json({ date: new Date().toLocaleString() })
})

randomsApiRouter.get('/api/randoms', (req, res) => {
    const { cant = DEFAULT_CANT } = req.query;
    // const numbers = [];

    const countRandomNumbers = fork('./src/utils/countRandomNumbers.js');
    
    countRandomNumbers.on('message', msg => {
        if (msg === 'listo') {
            countRandomNumbers.send(cant);
        } else {
            res.send(msg);
        }
    })
})

export default randomsApiRouter