const express = require('express');
const { getImages } = require('../controllers/get-images-firebase');
const router = express.Router();

router.get('/:category', getImages);

module.exports = router;