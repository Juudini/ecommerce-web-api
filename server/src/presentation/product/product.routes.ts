import { Router } from "express";
import { ProductDatasourceImpl, ProductRepositoryImpl } from "../../infrastructure";
import { ProductController } from "./product.controller";

export class ProductRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new ProductDatasourceImpl();
        const pizzaRepository = new ProductRepositoryImpl(database);

        const controller = new ProductController(pizzaRepository);

        router.post("/", controller.createProduct);

        router.get("/", controller.getProducts);

        router.get("/:pid", controller.getProductById);

        router.put("/:pid", controller.updateProductById);

        router.patch("/:pid", controller.partialUpdateProductById);

        router.delete("/:pid", controller.deleteProductById);

        return router;
    }
}
