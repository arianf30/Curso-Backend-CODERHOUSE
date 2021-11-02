const express = require('express');
const { getAllProducts, getProductById, createProduct, deleteProductById, editProduct } = require('../models/products');
const { isAuth } = require('../models/auth');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const data = await getAllProducts();
    res.send({ data });
});
productsRouter.get('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await getProductById(paramId);
    if (prod === null) {
        res.send({
            error: 'Producto no encontrado'
        });
    } else {
        res.send({
            messagge: 'success',
            data: prod
        });
    }
});

productsRouter.post('/', async (req, res) => {
    const isAuth = isAuth();
    if (isAuth === 'Admin') {
        const newProduct = req.body;
        const idSave = await createProduct(newProduct);
        res.send({ data: `Producto ${idSave} creado correctamente.` });
    } else {
        res.send({ Error: `Producto ${idSave} creado correctamente.` });
    }
});

productsRouter.put('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const product = req.body;
    const productEdit = {
        ...product,
        id: paramId
    }
    const idEdit = await editProduct(productEdit);
    res.send({ data: `Producto ${idEdit} editado correctamente.` });
});

productsRouter.delete('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await deleteProductById(paramId);
    res.send({ data: `Producto ${prod} eliminado correctamente.` });
});



module.exports = productsRouter;