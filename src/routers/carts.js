const express = require('express');
const { getAllCarts, getCartById, createCart, deleteCartById, editCart, deleteToCart } = require('../models/carts');
const { getProductById } = require('../models/products');
const isAdmin = require('../middlewares/auth');
const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
    const data = await getAllCarts();
    res.send({ data });
});
cartsRouter.get('/:id/productos', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await getCartById(paramId);
    if (prod === null) {
        res.send({
            error: 'Carrito no encontrado'
        });
    } else {
        res.send({ products: prod.products });
    }
});
// Nuevo carrito
cartsRouter.post('/', isAdmin, async (req, res) => {
    const newCart = req.body;
    console.log(req.body);
    const idSave = await createCart(newCart);
    res.send({ data: `Carrito ${idSave} creado correctamente.` });
});
// Insertar producto
cartsRouter.post('/:id/productos/:idProd', isAdmin, async (req, res) => {
    const idCart = parseInt(req.params.id);
    const id = parseInt(req.params.idProd);

    const product = getProductById(id);

    await addToCart(idCart, product);
    res.send({ data: `Producto ingresado con éxito al carrito ${idCart}.` });
});

cartsRouter.put('/:id', isAdmin, async (req, res) => {
    const paramId = parseInt(req.params.id);
    const cart = req.body;
    const cartEdit = {
        ...cart,
        id: paramId
    }
    const idEdit = await editCart(cartEdit);
    res.send({ data: `Carrito ${idEdit} editado correctamente.` });
});

cartsRouter.delete('/:id', isAdmin, async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await deleteCartById(paramId);
    res.send({ data: `Carrito ${paramId} eliminado correctamente.` });
});

cartsRouter.delete('/:idCart/producto/:idProd', isAdmin, async (req, res) => {
    const id = parseInt(req.params.idCart);
    const product_id = parseInt(req.params.idProd);
    const product = await getProductById(product_id);
    await deleteToCart(id, product);
    res.send({ data: `Producto eliminado correctamente del carrito ${id}.` });
});



module.exports = cartsRouter;