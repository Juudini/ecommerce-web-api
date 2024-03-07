/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
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
 *   - name: Categories
 *     description: Operations related to categories
 */
//~> |Get
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of available categories
 *     tags: [Categories]
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
 *       - name: sort "asc" or "desc"
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Get
/**
 * @swagger
 * /categories/{empid}:
 *   get:
 *     summary: Get an empanada by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the empanada to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */
//~> |Post
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new empanada
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Bad request
 */
//~> |Put
/**
 * @swagger
 * /categories/{empid}:
 *   put:
 *     summary: Update an empanada by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the empanada to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request
 */
//~> |Patch
/**
 * @swagger
 * /categories/{empid}:
 *   patch:
 *     summary: Update a beverage partially by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the beverage to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beverage'
 *     responses:
 *       204:
 *         description: Beverage updated partially successfully
 *       404:
 *         description: Beverage not found
 *       400:
 *         description: Bad request
 */
//~> |Delete
/**
 * @swagger
 * /categories/{empid}:
 *   delete:
 *     summary: Delete an empanada by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the empanada to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
