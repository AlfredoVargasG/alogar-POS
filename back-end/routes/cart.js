const express = require('express');
const { addToCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addToCart);

module.exports = router;
