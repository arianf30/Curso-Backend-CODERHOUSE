const express = require('express');
const isAdmin = require('../middlewares/auth');
const { selectDao } = require('../daos');

const productsRouter = express.Router();
const productDao = new selectDao();

// CREATE
productsRouter.post('/', isAdmin, async (req, res) => {
    const newProduct = req.body;
    const idSave = await productDao.create(newProduct);
    res.send({ data: `Producto ${idSave} creado correctamente.` });
});

// READ
productsRouter.get('/', async (req, res) => {
    const data = await productDao.readAll();
    res.send({ data });
});
productsRouter.get('/:id', async (req, res) => {
    const paramId = req.params.id;
    const prod = await productDao.readId(paramId);
    if (prod === null) {
        res.send({
            error: 'Producto no encontrado'
        });
    } else {
        res.send({
            data: prod
        });
    }
});

// UPDATE
productsRouter.put('/:id', isAdmin, async (req, res) => {
    const paramId = req.params.id;
    const product = req.body;
    const idEdit = await productDao.update(paramId, product);
    res.send({ data: `Producto ${idEdit} editado correctamente.` });
});

// DELETE
productsRouter.delete('/:id', isAdmin, async (req, res) => {
    const paramId = req.params.id;
    const prod = await productDao.deleteId(paramId);
    res.send({ data: `Producto ${prod} eliminado correctamente.` });
});


module.exports = productsRouter;