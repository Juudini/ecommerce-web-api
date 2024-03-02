/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *   - name: Products
 *     description: Operations about products
 */
//~> |Get
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of available products
 *     tags: [Products]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of products to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort "asc" or "desc"
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the products
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Get
/**
 * @swagger
 * /products/{pid}:
 *   get:
 *     summary: Retrieve a single pizza by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
//~> |Post
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new pizza
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 */
//~> |Put
/**
 * @swagger
 * /products/{pid}:
 *   put:
 *     summary: Update a pizza by ID
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
//~> |Patch
/**
 * @swagger
 * /products/{pid}:
 *   patch:
 *     summary: Update a pizza partially by ID
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: Product updated partially successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */
//~> |Delete
/**
 * @swagger
 * /products/{pid}:
 *   delete:
 *     summary: Delete a pizza by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the pizza to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
