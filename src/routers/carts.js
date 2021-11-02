const express = require('express');
const { getAllCarts, getCartById, createCart, deleteCartById, editCart } = require('../models/carts');
const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
    const data = await getAllCarts();
    res.send({ data });
});
cartsRouter.get('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await getCartById(paramId);
    if (prod === null) {
        res.send({
            error: 'Carrito no encontrado'
        });
    } else {
        res.send({
            messagge: 'success',
            data: prod
        });
    }
});

cartsRouter.post('/', async (req, res) => {
    const newCart = req.body;
    console.log(req.body);
    const idSave = await createCart(newCart);
    res.send({ data: `Carrito ${idSave} creado correctamente.` });
});

cartsRouter.put('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const cart = req.body;
    const cartEdit = {
        ...cart,
        id: paramId
    }
    const idEdit = await editCart(cartEdit);
    res.send({ data: `Carrito ${idEdit} editado correctamente.` });
});

cartsRouter.delete('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await deleteCartById(paramId);
    res.send({ data: `Carrito ${prod} eliminado correctamente.` });
});



module.exports = cartsRouter;