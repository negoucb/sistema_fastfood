const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController')

router.use(auth)
router.post('/', createProduct)
router.get('/', getProducts)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
