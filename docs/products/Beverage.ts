/**
 * @swagger
 * components:
 *   schemas:
 *     Beverage:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the beverage
 *         description:
 *           type: string
 *           description: Description of the beverage
 *         price:
 *           type: number
 *           description: Price of the beverage
 *         category:
 *           type: string
 *           description: Category of beverage
 *         thumbnail:
 *           type: array
 *           items:
 *             type: string
 *           default: [""]
 *           description: Array of thumbnail URLs (["www.image1.com", "www.image2.com"])
 */
//~> |
/**
 * @swagger
 * tags:
 *   name: Beverages
 *   description: Operations related to beverages
 */
//~> |
/**
 * @swagger
 * /beverages:
 *   get:
 *     summary: Get a list of available beverages
 *     tags: [Beverages]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of beverages to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the beverages
 *     responses:
 *       200:
 *         description: List of beverages retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Post
/**
 * @swagger
 * /beverages:
 *   post:
 *     summary: Add a new beverage
 *     tags: [Beverages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beverage'
 *     responses:
 *       201:
 *         description: Beverage added successfully
 *       400:
 *         description: Bad request
 */
//~> |Get
/**
 * @swagger
 * /beverages/{bvgid}:
 *   get:
 *     summary: Get a beverage by ID
 *     tags: [Beverages]
 *     parameters:
 *       - name: bvgid
 *         in: path
 *         required: true
 *         description: ID of the beverage to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beverage retrieved successfully
 *       404:
 *         description: Beverage not found
 */
//~> |Put
/**
 * @swagger
 * /beverages/{bvgid}:
 *   put:
 *     summary: Update a beverage by ID
 *     tags: [Beverages]
 *     parameters:
 *       - name: bvgid
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
 *         description: Beverage updated successfully
 *       404:
 *         description: Beverage not found
 *       400:
 *         description: Bad request
 */
//~> |Patch
/**
 * @swagger
 * /beverages/{bvgid}:
 *   patch:
 *     summary: Update a beverage partially by ID
 *     tags: [Beverages]
 *     parameters:
 *       - name: bvgid
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
 * /beverages/{bvgid}:
 *   delete:
 *     summary: Delete a beverage by ID
 *     tags: [Beverages]
 *     parameters:
 *       - name: bvgid
 *         in: path
 *         required: true
 *         description: ID of the beverage to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Beverage deleted successfully
 *       404:
 *         description: Beverage not found
 */
