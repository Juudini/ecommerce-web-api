import { Router } from "express";
import { DessertDatasourceImpl, DessertRepositoryImpl } from "../../../infrastructure";
import { DessertController } from "./dessert.controller";

export class DessertRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new DessertDatasourceImpl();
        const dessertRepository = new DessertRepositoryImpl(database);

        const controller = new DessertController(dessertRepository);

        router.get("/", controller.getDesserts);

        router.post("/", controller.createDessert);

        router.get("/:dstid", controller.getDessertById);

        router.put("/:dstid", controller.updateDessertById);

        router.patch("/:dstid", controller.partialUpdateDessertById);

        router.delete("/:dstid", controller.deleteDessertById);

        return router;
    }
}
