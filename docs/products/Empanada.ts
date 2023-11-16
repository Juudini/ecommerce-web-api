/**
 * @swagger
 * components:
 *   schemas:
 *     Empanada:
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
 *   - name: Empanadas
 *     description: Operations related to empanadas
 */
//~> |Get
/**
 * @swagger
 * /empanadas:
 *   get:
 *     summary: Get a list of available empanadas
 *     tags: [Empanadas]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The number of empanadas to return per page
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number
 *       - name: sort "asc" or "desc"
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort order for the empanadas
 *     responses:
 *       200:
 *         description: List of empanadas retrieved successfully
 *       500:
 *         description: Internal server error
 */
//~> |Get
/**
 * @swagger
 * /empanadas/{empid}:
 *   get:
 *     summary: Get an empanada by ID
 *     tags: [Empanadas]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the empanada to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empanada retrieved successfully
 *       404:
 *         description: Empanada not found
 */
//~> |Post
/**
 * @swagger
 * /empanadas:
 *   post:
 *     summary: Add a new empanada
 *     tags: [Empanadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empanada'
 *     responses:
 *       201:
 *         description: Empanada added successfully
 *       400:
 *         description: Bad request
 */
//~> |Put
/**
 * @swagger
 * /empanadas/{empid}:
 *   put:
 *     summary: Update an empanada by ID
 *     tags: [Empanadas]
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
 *             $ref: '#/components/schemas/Empanada'
 *     responses:
 *       200:
 *         description: Empanada updated successfully
 *       404:
 *         description: Empanada not found
 *       400:
 *         description: Bad request
 */
//~> |Patch
/**
 * @swagger
 * /empanadas/{empid}:
 *   patch:
 *     summary: Update a beverage partially by ID
 *     tags: [Empanadas]
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
 * /empanadas/{empid}:
 *   delete:
 *     summary: Delete an empanada by ID
 *     tags: [Empanadas]
 *     parameters:
 *       - name: empid
 *         in: path
 *         required: true
 *         description: ID of the empanada to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Empanada deleted successfully
 *       404:
 *         description: Empanada not found
 */
