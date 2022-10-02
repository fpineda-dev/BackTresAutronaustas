const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
// const bodyParser = require('body-parser');

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generate id of the users
 *          name:
 *            type: string
 *            description: The name of user
 *          email:
 *            type: string
 *            description: The email of user
 *          password:
 *            description: The password of user
 *        example:
 *           name: Pepito
 *           email: pndafran@gmail.com
 *           password: cualquiera
 *           token: 6336d5ed718d8c8d59eddd03
 */

/**
 * @swagger
 * /users/{email}/{password}:
 *                  get:
 *                    summary: Returns the user register in database
 *                    tags: [users]
 *                    parameters:
 *                      - in: path
 *                        name: email
 *                        schema:
 *                          type: string
 *                        required: true
 *                        description: The email user
 *                      - in: path
 *                        name: password
 *                        schema:
 *                          type: string
 *                        required: true
 *                        description: The password user
 *                    responses:
 *                      200:
 *                        description: User registered in database
 *                        contents:
 *                          application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/Users'
 *                      404:
 *                        description: The user was not found
 */

const router = express.Router();
const {
  createUser,
  loginUser,
} = require('../controller/users');

router.get('/:email/:password', loginUser);

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server
 */
router.post('/', createUser);

module.exports = router;
