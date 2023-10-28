import { Router } from "express";
import { PizzaDatasourceImpl, PizzaRepositoryImpl } from "../../../../infrastructure";
import { PizzaController } from "./pizza.controller";

export class PizzaRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new PizzaDatasourceImpl();
        const pizzaRepository = new PizzaRepositoryImpl(database);

        const controller = new PizzaController(pizzaRepository);

        router.post("/", controller.createPizza);

        router.get("/", controller.getPizzas);

        router.get("/:pid", controller.getPizzaById);

        router.put("/:pid", controller.updatePizzaById);

        router.patch("/:pid", controller.partialUpdatePizzaById);

        router.delete("/:pid", controller.deletePizzaById);

        return router;
    }
}
