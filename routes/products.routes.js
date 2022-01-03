const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.postOne);
router.put('/products/:id', ProductController.putOneById);
router.delete('/products/:id', ProductController.deleteById);

module.exports = router;
