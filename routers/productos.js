const express = require('express');
/* const { Router } = express;
const router = Router(); */
const productosRouter = express.Router();

// Clase de productos
const Contenedor = require('../Contenedor');
const productosContenedor = new Contenedor('./data/productos.json');

productosRouter.get('/', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.send({
        messagge: 'success',
        data: lista
    });
});
productosRouter.get('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await productosContenedor.getById(paramId);
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

productosRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    const idSave = await productosContenedor.save(newProduct);
    res.send({
        messagge: 'success',
        data: {
            ...newProduct,
            id: idSave
        }
    });
});

productosRouter.put('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const product = req.body;
    const editProduct = {
        ...product,
        id: paramId
    }
    const idEdit = await productosContenedor.edit(editProduct);
    res.send({
        messagge: 'success',
        data: idEdit
    });
});

productosRouter.delete('/:id', async (req, res) => {
    const paramId = parseInt(req.params.id);
    const prod = await productosContenedor.deleteById(paramId);
    res.send({
        messagge: 'deleted',
    });
});



module.exports = productosRouter;