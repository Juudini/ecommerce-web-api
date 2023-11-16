import { Router } from "express";
import { PizzaRoutes, BeverageRoutes, DessertRoutes, EmpanadaRoutes } from "./products";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/pizzas", PizzaRoutes.routes);
        router.use("/api/beverages", BeverageRoutes.routes);
        router.use("/api/desserts", DessertRoutes.routes);
        router.use("/api/empanadas", EmpanadaRoutes.routes);

        return router;
    }
}
