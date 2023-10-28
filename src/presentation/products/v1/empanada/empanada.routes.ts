import { Router } from "express";
import { EmpanadaDatasourceImpl, EmpanadaRepositoryImpl } from "../../../../infrastructure";
import { EmpanadaController } from "./empanada.controller";

export class EmpanadaRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new EmpanadaDatasourceImpl();
        const empanadaRepository = new EmpanadaRepositoryImpl(database);

        const controller = new EmpanadaController(empanadaRepository);

        router.get("/", controller.getEmpanadas);

        router.post("/", controller.createEmpanada);

        router.get("/:empid", controller.getEmpanadaById);

        router.put("/:empid", controller.updateEmpanadaById);

        router.patch("/:empid", controller.partialUpdateEmpanadaById);

        router.delete("/:empid", controller.deleteEmpanadaById);

        return router;
    }
}
