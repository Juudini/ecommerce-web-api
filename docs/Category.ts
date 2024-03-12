/* eslint-disable unicorn/no-empty-file */
//* Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the category.
 *           minLength: 3
 *           maxLength: 50
 *       required:
 *         - title
 */

//*~> |
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations related to categories
 */
//?~> |Get
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
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order for the categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Internal server error
 */
//?~> |Get
/**
 * @swagger
 * /categories/{ctyid}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: ctyid
 *         in: path
 *         required: true
 *         description: ID of the category to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */
//?~> |Post
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new category
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
//?~> |Put
/**
 * @swagger
 * /categories/{ctyid}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: ctyid
 *         in: path
 *         required: true
 *         description: ID of the category to update
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
//?~> |Patch
/**
 * @swagger
 * /categories/{ctyid}:
 *   patch:
 *     summary: Update a category partially by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: ctyid
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       204:
 *         description: Category updated partially successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request
 */
//?~> |Delete
/**
 * @swagger
 * /categories/{ctyid}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: ctyid
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
