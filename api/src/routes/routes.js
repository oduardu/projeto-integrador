const app = require('express')
const router = app.Router()

const auth = require('../authRoutes/auth')
const client = require('../cruds/client')
const product = require('../cruds/product')
const supplier = require('../cruds/supplier')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

router.get('/client/', client.getAllClients)
router.get('/client/search', client.getClientByName)
router.post('/client', client.addClient)
router.put('/client/:indentifier', client.updateClient)
router.delete('/client/:indentifier', client.deleteClient)

router.get('/product/', product.getAllProducts)
router.get('/product/search', product.getProductByName)
router.post('/product', product.addProduct)
router.put('/product/:indentifier', product.updateProduct)
router.delete('/product/:indentifier', product.deleteProduct)

router.get('/supplier', supplier.getAllSuppliers)
router.get('/supplier/search', supplier.getSupplierByName)
router.post('/supplier', supplier.addSupplier)
router.put('/supplier/:indentifier', supplier.updateSupplier)
router.delete('/supplier/:indentifier', supplier.deleteSupplier)

module.exports = router