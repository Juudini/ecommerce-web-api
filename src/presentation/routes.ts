import { Router } from "express";
import { PizzaRoutes, BeverageRoutes, DessertRoutes, EmpanadaRoutes } from "./products";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/products/pizzas", PizzaRoutes.routes);
        router.use("/api/products/beverages", BeverageRoutes.routes);
        router.use("/api/products/desserts", DessertRoutes.routes);
        router.use("/api/products/empanadas", EmpanadaRoutes.routes);

        return router;
    }
}
