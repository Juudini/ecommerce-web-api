import { Router } from "express";
import { ProductRoutes } from "./product";
import { CategoryRoutes } from "./category";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/products", ProductRoutes.routes);
        router.use("/api/categories", CategoryRoutes.routes);

        return router;
    }
}
