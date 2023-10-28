import { Router } from "express";
import { PizzaRoutes, BeverageRoutes, DessertRoutes, EmpanadaRoutes } from "./products";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/v1/pizzas", PizzaRoutes.routes);
        router.use("/api/v1/beverages", BeverageRoutes.routes);
        router.use("/api/v1/desserts", DessertRoutes.routes);
        router.use("/api/v1/empanadas", EmpanadaRoutes.routes);

        return router;
    }
}
