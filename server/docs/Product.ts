/* eslint-disable unicorn/no-empty-file */
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductEntity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the product (UUID).
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
 *               productId:
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
