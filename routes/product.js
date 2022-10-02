const express = require('express');
const auth = require('../middleware/auth');
// eslint-disable-next-line import/no-extraneous-dependencies
// const bodyParser = require('body-parser');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     basicAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *       scheme: basic
 *   schemas:
 *     Products:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - productManage
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generate id of the users
 *          name:
 *            type: string
 *            description: The name of product
 *          price:
 *            type: number
 *            description: The price of product
 *          productManage:
 *            type: string
 *            description: The owner of product
 *        example:
 *           name: Crater
 *           price: 100000000
 *
 */

const router = express.Router();
const {
  findAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/product');

/**
 * @swagger
 * /product/{id}:
 *      put:
 *        security:
 *          - basicAuth: []
 *        summary: Update the product by the id
 *        tags: [Products]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Product id
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Products'
 *        responses:
 *          200:
 *            description: The Product was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Products'
 *          400:
 *            description: The Product not found
 *          500:
 *            description: Some error happened
 */

/**
 * @swagger
 * /product:
 *     get:
 *       security:
 *         - basicAuth: []
 *       summary: Returns the user register in database
 *       tags: [Products]
 *       responses:
 *         200:
 *           description: Products registered in database
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Products'
 *         404:
 *           description: The product was not found
 */

router.get('/', auth, findAllProduct);

/**
 * @swagger
 * /product:
 *  post:
 *    security:
 *       - basicAuth: []
 *    summary: Create a new product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        description: The product was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      500:
 *        description: Some server
 */
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);

/**
 * @swagger
 * /product/{id}:
 *      delete:
 *        security:
 *          - basicAuth: []
 *        summary: Remove product by the id
 *        tags: [Products]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Product id
 *        responses:
 *          200:
 *            description: The Product was deleted
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Products'
 *          400:
 *            description: The Product was not found
 *          500:
 *            description: Some error happened
 */

router.delete('/:id', auth, deleteProduct);

module.exports = router;
