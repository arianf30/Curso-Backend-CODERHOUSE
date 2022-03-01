import { strict as assert } from 'assert'
import axios from 'axios'

/* global describe, it */
describe('Test de la API', () => {
  it('Iniciar sesión con usuario de prueba', async () => {
    await axios.post('http://localhost:8080/api/users/login/', {
      email: 'arianfernandez@gmail.com',
      password: '123456'
    })
      .then(response => {
        assert.strictEqual(response.data.email, 'arianfernandez@gmail.com')
      })
  })

  it('Traer lista de productos', async () => {
    await axios('http://localhost:8080/api/products/')
      .then(response => {
        assert.strictEqual(response.status, 200)
      })
  })

  it('Traer lista de usuarios', async () => {
    await axios('http://localhost:8080/api/users/')
      .then(response => {
        assert.strictEqual(response.status, 200)
      })
  })

  it('Insertar un producto y traerlo con Axios', async () => {
    const item = {
      title: 'Producto aregado con el Test Mocha',
      price: 1000,
      thumbnail: 'https://picsum.photos/200/300',
      user: null
    }
    await axios.post('http://localhost:8080/api/products/', item, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQyMzU0OTc0ZDhhNzgwYWMyMjdlMiIsImVtYWlsIjoiYXJpYW5mZXJuYW5kZXpAZ21haWwuY29tIiwiaWF0IjoxNjQ0MDE1MzU3fQ.TKS7I7-mYP9MsckM7c3TCgQoJphBszEUTdeaRTzKHSQ'
      }
    })

    axios.get('http://localhost:8080/api/products')
      .then(products => {
        assert.strictEqual(products[products.length].title, item.title)
      })
  })

  it('Editar un producto', async () => {
    await axios.put('http://localhost:8080/api/products/', {
      productId: '61f9d793b5f5b93fb6837624',
      newProduct: {
        title: 'LISTERINE - Enjuague bucal - Editado con Mocha',
        price: 490,
        thumbnail: 'https://jumboargentina.vtexassets.com/arquivos/ids/439627-800-600?v=636517679773430000&width=800&height=600&aspect=true'
      }
    })
      .then(response => {
        assert.strictEqual(response.status, 200)
      })
  })
})
