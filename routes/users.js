const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
// const bodyParser = require('body-parser');

const router = express.Router();
const {
  createUser,
  loginUser,
} = require('../controller/users');

router.get('/:email/:password', loginUser);
router.post('/', createUser);

module.exports = router;
