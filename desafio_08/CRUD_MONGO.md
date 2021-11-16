### Crear DB
```
mongo ecommerce  //  mongo      use ecommerce
```

### Crear Colecciones
```
db.createCollection('messages')
db.createCollection('products')
```

### 1 y 2) Agregar 10 documentos con valores distintos
```
db.messages.insertMany([
    { author: 'Arián', text: 'Hola!' },
    { author: 'Hernán', text: 'Buenas' },
    { author: 'Seba', text: 'Buen día' },
    { author: 'Matias', text: 'cómo andan?' },
    { author: 'Laura', text: 'hola a todos' },
    { author: 'Lucas', text: 'buenass' },
    { author: 'Camila', text: 'Buenas!' },
    { author: 'Lorena', text: 'Hola hola' },
    { author: 'Eze', text: 'Hola cómo va?' },
    { author: 'Claudia', text: 'Qué dicen?' },
])
db.products.insertMany([
    { name: 'product 1', description: 'descripción 1!', code: '101', photo: '', price: 100, stock: 20 },
    { name: 'product 2', description: 'descripción 2!', code: '102', photo: '', price: 200, stock: 18 },
    { name: 'product 3', description: 'descripción 3!', code: '103', photo: '', price: 500, stock: 5 },
    { name: 'product 4', description: 'descripción 4!', code: '104', photo: '', price: 700, stock: 10 },
    { name: 'product 5', description: 'descripción 5!', code: '105', photo: '', price: 900, stock: 23 },
    { name: 'product 6', description: 'descripción 6!', code: '106', photo: '', price: 1400, stock: 12 },
    { name: 'product 7', description: 'descripción 7!', code: '107', photo: '', price: 2300, stock: 15 },
    { name: 'product 8', description: 'descripción 8!', code: '108', photo: '', price: 3200, stock: 8 },
    { name: 'product 9', description: 'descripción 9!', code: '109', photo: '', price: 4100, stock: 9 },
    { name: 'product 10', description: 'descripción 10!', code: '110', photo: '', price: 5000, stock: 19 },
])
```

### 3) Listar todos los documentos de cada colección
```
db.messages.find().pretty()
db.products.find().pretty()
```

### 4) Mostrar la cantidad de elementos en cada una de ellas
```
db.messages.count()
db.products.count()
```

### 5) Realizar CRUD sobre la colección de productos
### a) Agregar un producto más en la colección de productos
```
db.products.insertOne({
    name: 'product 11', description: 'descripción 11!', code: '111', photo: '', price: 4800, stock: 11
})
```
### b) Realizar una consulta por nombre de producto específico
```
// i)
db.products.find(
    { price: { $lt: 1000 }}, { name: 1, _id: 0 }
).pretty()
// ii)
db.products.find(
    { $and: [{ price: {$gte: 1000} }, {price: {$lte: 3000} }] }, { name: 1, price: 1, _id: 0 }
).pretty()
// iii)
db.products.find(
    { price: {$gt: 3000} }, { name: 1, price: 1, _id: 0 }
).pretty()
// iv)
db.products.find({}, { name: 1, _id: 0 }).sort({price: 1}).skip(2).limit(1)
```

### c) Actualización sobre todos los productos, agregando stock 100
```
db.products.updateMany(
    {}, { $set: {stock: 100} }
)
```
### d) Stock a 0 a los productos con precio mayor a 4000
```
db.products.updateMany(
    { price: {$gt:4000} },
    { $set: {stock:0} }
)
```
### e) Borrar productos con precio menor a 1000
```
db.products.deleteMany(
    { price: {$lt:1000} }
)
```