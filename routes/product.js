const express = require('express');
const auth = require('../middleware/auth');
// eslint-disable-next-line import/no-extraneous-dependencies
// const bodyParser = require('body-parser');

const router = express.Router();
const {
  findAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/product');

router.get('/', findAllProduct);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
