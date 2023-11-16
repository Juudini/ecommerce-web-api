/**
 * @swagger
 * components:
 *   schemas:
 *     Dessert:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the dessert
 *         description:
 *           type: string
 *           description: Description of the dessert
 *         price:
 *           type: number
 *           description: Price of the dessert
 *         type:
 *           type: string
 *           enum: [cold, hot]
 *           default: cold
 *           description: Type of dessert (cold or hot)
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
 *   name: Desserts
 *   description: Operations related to desserts
 */
//~> |Get
/**
 * @swagger
 * /desserts:
 *   get:
 *     summary: Get a list of available desserts
 *     tags: [Desserts]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of desserts to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the desserts
 *     responses:
 *       200:
 *         description: List of desserts retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Get
/**
 * @swagger
 * /desserts/{dstid}:
 *   get:
 *     summary: Get a dessert by ID
 *     tags: [Desserts]
 *     parameters:
 *       - name: dstid
 *         in: path
 *         required: true
 *         description: ID of the dessert to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dessert retrieved successfully
 *       404:
 *         description: Dessert not found
 */
//~> |Post
/**
 * @swagger
 * /desserts:
 *   post:
 *     summary: Add a new dessert
 *     tags: [Desserts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dessert'
 *     responses:
 *       201:
 *         description: Dessert added successfully
 *       400:
 *         description: Bad request
 */
//~> |Put
/**
 * @swagger
 * /desserts/{dstid}:
 *   put:
 *     summary: Update a dessert by ID
 *     tags: [Desserts]
 *     parameters:
 *       - name: dstid
 *         in: path
 *         required: true
 *         description: ID of the dessert to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dessert'
 *     responses:
 *       204:
 *         description: Dessert updated successfully
 *       404:
 *         description: Dessert not found
 *       400:
 *         description: Bad request
 */
//~> |Patch
/**
 * @swagger
 * /desserts/{dstid}:
 *   patch:
 *     summary: Update a dessert partially by ID
 *     tags: [Desserts]
 *     parameters:
 *       - name: dstid
 *         in: path
 *         required: true
 *         description: ID of the dessert to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dessert'
 *     responses:
 *       204:
 *         description: Dessert updated partially successfully
 *       404:
 *         description: Dessert not found
 *       400:
 *         description: Bad request
 */
//~> |Delete
/**
 * @swagger
 * /desserts/{dstid}:
 *   delete:
 *     summary: Delete a dessert by ID
 *     tags: [Desserts]
 *     parameters:
 *       - name: dstid
 *         in: path
 *         required: true
 *         description: ID of the dessert to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dessert deleted successfully
 *       404:
 *         description: Dessert not found
 */
