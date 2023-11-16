/**
 * @swagger
 * components:
 *   schemas:
 *     Pizza:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the pizza
 *         description:
 *           type: string
 *           description: Description of the pizza
 *         price:
 *           type: number
 *           description: Price of the pizza
 *         type:
 *           type: string
 *           description: Type of pizza ("whole", "half")
 *         thumbnail:
 *           type: array
 *           items:
 *             type: string
 *           default: [""]
 *           description: Array of thumbnail URLs (["www.imagen1.com", "www.imagen2.com"])
 */
//~> |
/**
 * @swagger
 * tags:
 *   - name: Pizzas
 *     description: Operations about pizzas
 */
//~> |Get
/**
 * @swagger
 * /pizzas:
 *   get:
 *     summary: Get a list of available pizzas
 *     tags: [Pizzas]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of pizzas to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort "asc" or "desc"
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the pizzas
 *     responses:
 *       200:
 *         description: List of pizzas retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Get
/**
 * @swagger
 * /pizzas/{pid}:
 *   get:
 *     summary: Retrieve a single pizza by ID
 *     tags: [Pizzas]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pizza retrieved successfully
 *       404:
 *         description: Pizza not found
 */
//~> |Post
/**
 * @swagger
 * /pizzas:
 *   post:
 *     summary: Add a new pizza
 *     tags: [Pizzas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pizza'
 *     responses:
 *       201:
 *         description: Pizza added successfully
 *       400:
 *         description: Bad request
 */
//~> |Put
/**
 * @swagger
 * /pizzas/{pid}:
 *   put:
 *     summary: Update a pizza by ID
 *     tags: [Pizzas]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pizza'
 *     responses:
 *       204:
 *         description: Pizza updated successfully
 *       404:
 *         description: Pizza not found
 */
//~> |Patch
/**
 * @swagger
 * /pizzas/{pid}:
 *   patch:
 *     summary: Update a pizza partially by ID
 *     tags: [Pizzas]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pizza'
 *     responses:
 *       204:
 *         description: Pizza updated partially successfully
 *       404:
 *         description: Pizza not found
 *       400:
 *         description: Bad request
 */
//~> |Delete
/**
 * @swagger
 * /pizzas/{pid}:
 *   delete:
 *     summary: Delete a pizza by ID
 *     tags: [Pizzas]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pizza deleted successfully
 *       404:
 *         description: Pizza not found
 */
