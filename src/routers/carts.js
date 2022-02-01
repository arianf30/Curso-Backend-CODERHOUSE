import express from 'express'
import { cartDao } from '../daos/index.js'

const { Router } = express

// --------------------------------------------
// configuro router de carritos

const cartsRouter = new Router()

cartsRouter.get('/', async (req, res) => {
  res.json((await cartDao.readAll()).map(c => c.id))
})

cartsRouter.post('/', async (req, res) => {
  res.json(await cartDao.create())
})

cartsRouter.delete('/:id', async (req, res) => {
  res.json(await cartDao.delete(req.params.id))
})

// --------------------------------------------------
// router de productos en carrito

cartsRouter.get('/:id/productos', async (req, res) => {
  const cart = await cartDao.read(req.params.id)
  res.json(cart.products)
})

// carritosRouter.post('/:id/productos', async (req, res) => {
//     const carrito = await carritosApi.read(req.params.id)
//     const producto = await productosApi.read(req.body.id)
//     carrito.productos.push(producto)
//     await carritosApi.update(carrito)
//     res.end()
// })

// carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
//     const carrito = await carritosApi.read(req.params.id)
//     const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
//     if (index != -1) {
//         carrito.productos.splice(index, 1)
//         await carritosApi.update(carrito)
//     }
//     res.end()
// })

export default cartsRouter
