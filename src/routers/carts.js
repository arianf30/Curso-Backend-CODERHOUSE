const express = require('express');
const isAdmin = require('../middlewares/auth');
const { selectDaoCart } = require('../daos')

const cartsRouter = express.Router();
const cartDao = new selectDaoCart();

// CREATE
cartsRouter.post('/', isAdmin, async (req, res) => {
    const newCart = req.body;
    const idSave = await cartDao.create(newCart);
    res.send({ data: `Carrito ${idSave} creado correctamente.` });
});

// READ
cartsRouter.get('/', async (req, res) => {
    const data = await cartDao.readAll();
    res.send({ data });
});
cartsRouter.get('/:id', async (req, res) => {
    const paramId = req.params.id;
    const cart = await cartDao.readId(paramId);
    if (cart === null) {
        res.send({
            error: 'Carrito no encontrado'
        });
    } else {
        res.send({
            data: cart
        });
    }
});

// UPDATE
cartsRouter.put('/:id', isAdmin, async (req, res) => {
    const paramId = req.params.id;
    const cart = req.body;
    const idEdit = await cartDao.update(paramId, cart);
    res.send({ data: `Carrito ${idEdit} editado correctamente.` });
});

// DELETE
cartsRouter.delete('/:id', isAdmin, async (req, res) => {
    const paramId = req.params.id;
    const cart = await cartDao.deleteId(paramId);
    res.send({ data: `Carrito ${cart} eliminado correctamente.` });
});

module.exports = cartsRouter;