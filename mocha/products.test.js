import Products from './products.js'
import { strict as assert } from 'assert'

describe('Demo class test', () => {
  it('should add item with add() method', () => {
    const item = 1
    const demo = new Products()
    demo.add(item)
    assert.strictEqual(demo.getList()[0], item)
  })
})
