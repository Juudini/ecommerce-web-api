/* eslint-disable unicorn/no-empty-file */
//* Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         inStock:
 *           type: number
 *           description: The quantity of the product in stock.
 *         product_images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The identifier for the image (UUID).
 *               url:
 *                 type: string
 *                 description: The URL of the image.
 *               pid:
 *                 type: string
 *                 description: The unique identifier for the product (UUID).
 *                 default: [""]
 *           description: An array of product images.
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The identifier for the category (UUID).
 *               title:
 *                 type: string
 *                 description: The title of the category.
 *           description: An array of category names the product belongs to.
 *       required:
 *         - title
 *         - description
 *         - price
 *         - inStock
 */
//*~> |
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */
//?~> |GET
/**
 * /products:
 *   get:
 *     summary: Get a list of available products
 *     tags: [Products]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of categories to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order for the categories
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
//?~> |POST
/**
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, product already exists
 *       500:
 *         description: Internal server error
 */

//?~> |GET
/**
 * /products/{pid}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product to get
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

//?~> |PUT
/**
 * /products/{pid}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

//?~> |DELETE
/**
 * /products/{pid}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
