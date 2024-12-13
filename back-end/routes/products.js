const express = require('express');
const { getAllProducts, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);

module.exports = router;