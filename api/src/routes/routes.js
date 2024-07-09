const express = require('express')
const router = express.Router()

const auth = require('../auth/auth')
const client = require('../cruds/client')
const product = require('../cruds/product')
const supplier = require('../cruds/supplier')
const authenticateToken = require('../auth/middleware')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

router.get('/client/', authenticateToken, client.getAllClients)
router.post('/client', authenticateToken, client.addClient)
router.put('/client/:identifier', authenticateToken, client.updateClient)
router.delete('/client/:identifier', authenticateToken, client.deleteClient)

router.get('/product/', authenticateToken, product.getAllProducts)
router.post('/product', authenticateToken, product.addProduct)
router.put('/product/:identifier', authenticateToken, product.updateProduct)
router.delete('/product/:identifier', authenticateToken, product.deleteProduct)

router.get('/supplier', authenticateToken, supplier.getAllSuppliers)
router.post('/supplier', authenticateToken, supplier.addSupplier)
router.put('/supplier/:identifier', authenticateToken, supplier.updateSupplier)
router.delete('/supplier/:identifier', authenticateToken, supplier.deleteSupplier)

module.exports = router
