import { Router } from "express";
import { ProductRoutes } from "./product";
import { CategoryRoutes } from "./category";
import { AuthRoutes } from "./auth";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/products", ProductRoutes.routes);
        router.use("/api/categories", CategoryRoutes.routes);
        router.use("/api/users", AuthRoutes.routes);

        return router;
    }
}
