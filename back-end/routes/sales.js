const express = require('express');
const { processCheckout } = require('../controllers/salesController');
const router = express.Router();

router.post('/checkout', processCheckout);

module.exports = router;