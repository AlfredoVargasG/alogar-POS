const express = require('express');
const { getImages } = require('../controllers/get-images-firebase');
const router = express.Router();

router.get('/', getImages);

module.exports = router;