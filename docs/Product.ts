/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The identifier for the product (UUID).
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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

//?~>|GET
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of available products
 *     tags: [Products]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: The number of products to return per page
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: The page number
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         description: Sort order for the products
 *         schema:
 *           type: string
 *           enum: [asc, desc]
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

///?~>|POST
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               inStock:
 *                 type: number
 *                 description: The quantity of the product in stock.
 *               product_images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: The identifier for the image (UUID).
 *                     url:
 *                       type: string
 *                       description: The URL of the image.
 *                     pid:
 *                       type: string
 *                       description: The unique identifier for the product (UUID).
 *                       default: [""]
 *                 description: An array of product images.
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The identifier for the category (UUID).
 *                     title:
 *                       type: string
 *                       description: The title of the category.
 *                 description: An array of category names the product belongs to.
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

//?~>|GET BY ID
/**
 * @swagger
 * /products/{pid}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID of the product to get
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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

//?~>|UPDATE
/**
 * @swagger
 * /products/{pid}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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

//?~>|PATCH
/**
 * @swagger
 * /products/{pid}:
 *   patch:
 *     summary: Partially update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the product.
 *               description:
 *                 type: string
 *                 description: The new description of the product.
 *               price:
 *                 type: number
 *                 description: The new price of the product.
 *               inStock:
 *                 type: number
 *                 description: The new quantity of the product in stock.
 *               product_images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: The identifier for the image (UUID).
 *                     url:
 *                       type: string
 *                       description: The URL of the image.
 *                     pid:
 *                       type: string
 *                       description: The unique identifier for the product (UUID).
 *                       default: [""]
 *                 description: An array of new product images.
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The identifier for the category (UUID).
 *                     title:
 *                       type: string
 *                       description: The title of the category.
 *                 description: An array of new category names the product belongs to.
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

//?~>|DELETE
/**
 * @swagger
 * /products/{pid}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
