import supertest from 'supertest'
import { expect } from 'chai'

const URL = 'http://localhost:8080'
const request = supertest(URL)

/* global describe, it */
describe('CRUD de Productos', () => {
  let idCreated

  it('[STATUS] Probando getAll status', async () => {
    const response = await request.get('/api/products')
    expect(response.status).to.be.equal(200)
  })

  it('[CREATE] Crear un producto nuevo', async () => {
    const response = await request.post('/api/products').send({
      title: 'Producto creado con Chai, Supertest y Mocha',
      price: 150,
      thumbnail: 'http://lorempixel.com/1600/900'
    }).set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQyMzU0OTc0ZDhhNzgwYWMyMjdlMiIsImVtYWlsIjoiYXJpYW5mZXJuYW5kZXpAZ21haWwuY29tIiwiaWF0IjoxNjQ0MDE1MzU3fQ.TKS7I7-mYP9MsckM7c3TCgQoJphBszEUTdeaRTzKHSQ'
    })
    idCreated = response.body.id
    expect(response.status).to.be.equal(200)
  })

  it('[READ] Probando que productos devuelva un array y sus items contengan las propiedades title y price', async () => {
    const response = await request.get('/api/products')
    expect(response).to.not.be.an('array')
    expect(response.body[0]).to.include.keys('title', 'price')
  })

  it('[UPDATE] Editar el producto recién creado', async () => {
    const response = await request.put('/api/products').send({
      productId: idCreated,
      newProduct: {
        title: 'Editado con Mocha, Chai y Supertest',
        price: 100,
        thumbnail: 'http://lorempixel.com/1600/900'
      }
    }).set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQyMzU0OTc0ZDhhNzgwYWMyMjdlMiIsImVtYWlsIjoiYXJpYW5mZXJuYW5kZXpAZ21haWwuY29tIiwiaWF0IjoxNjQ0MDE1MzU3fQ.TKS7I7-mYP9MsckM7c3TCgQoJphBszEUTdeaRTzKHSQ'
    })
    expect(response.status).to.be.equal(200)
  })

  it('[DELETE] Eliminar el producto recién modificado', async () => {
    const response = await request.delete(`/api/products/${idCreated}`).set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQyMzU0OTc0ZDhhNzgwYWMyMjdlMiIsImVtYWlsIjoiYXJpYW5mZXJuYW5kZXpAZ21haWwuY29tIiwiaWF0IjoxNjQ0MDE1MzU3fQ.TKS7I7-mYP9MsckM7c3TCgQoJphBszEUTdeaRTzKHSQ'
    })
    expect(response.status).to.be.equal(200)
  })
})
