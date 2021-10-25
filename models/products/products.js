const products = [
    {
      "name": "Samsung S21",
      "price": "100000",
      "thumbnail": "https://samsungar.vtexassets.com/arquivos/ids/165010/Samsung-81181084-ar-galaxy-s21-5g-g991-sm-g991bzalaro-368338802Download-Source.png?v=637468520722100000",
      "id": 1
    },
    {
      "name": "Iphone 11",
      "price": "100000",
      "thumbnail": "https://www.apple.com/v/iphone-11/e/images/meta/og__f2jtwncwsl2e_specs.png",
      "id": 2
    },
    {
      "name": "Nuevo",
      "price": "",
      "thumbnail": "",
      "id": 3
    },
    {
      "name": "Samsung Gear S3 Frontier",
      "price": "98900",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_674137-MLA31113803849_062019-F.webp",
      "id": 4
    }
  ]

const getProducts = () => products;

const saveProduct = (product) => {
    products.push(product)
}

module.exports = {
    getProducts,
    saveProduct
}