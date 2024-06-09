const app = require('express')
const router = app.Router()

const stock = require('../cruds/stock')
const product = require('../cruds/product')
const supplier = require('../cruds/supplier')

router.get('/stock/:index?', stock.getStock)
router.post('/stock', stock.addStock)
router.put('/stock/:index', stock.updateStock)
router.delete('/stock/:index', stock.deleteStock)

router.get('/product/:index?', product.getProduct)
router.post('/product', product.addProduct)
router.put('/product/:index', product.updateProduct)
router.delete('/product/:index', product.deleteProduct)

router.get('/supplier/:index?', supplier.getSupplier)
router.post('/supplier', supplier.addSupplier)
router.put('/supplier/:index', supplier.updateSupplier)
router.delete('/supplier/:index', supplier.deleteSupplier)

module.exports = router