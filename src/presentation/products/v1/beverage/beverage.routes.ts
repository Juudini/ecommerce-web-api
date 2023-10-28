import { Router } from "express";
import { BeverageDatasourceImpl, BeverageRepositoryImpl } from "../../../../infrastructure";
import { BeverageController } from "./beverage.controller";

export class BeverageRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new BeverageDatasourceImpl();
        const beverageRepository = new BeverageRepositoryImpl(database);

        const controller = new BeverageController(beverageRepository);

        router.get("/", controller.getBeverages);

        router.post("/", controller.createBeverage);

        router.get("/:bvgid", controller.getBeverageById);

        router.put("/:bvgid", controller.updateBeverageById);

        router.patch("/:bvgid", controller.partialUpdateBeverageById);

        router.delete("/:bvgid", controller.deleteBeverageById);

        return router;
    }
}
