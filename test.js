const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('./data/productos.json');

contenedor.save({
    title: 'Iphone 11',
    price: 100000,
    thumbnail: 'https://www.apple.com/v/iphone-11/e/images/meta/og__f2jtwncwsl2e_specs.png'
})