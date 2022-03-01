class Products {
  constructor () {
    this.list = []
  }

  add (item) {
    this.list.push(item)
  }

  getList () {
    return [...this.list]
  }
}

export default Products
