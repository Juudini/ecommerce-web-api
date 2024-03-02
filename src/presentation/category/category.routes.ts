import { Router } from "express";
import { CategoryRepositoryImpl, CategoryDatasourceImpl } from "../../infrastructure";
import { CategoryController } from "./category.controller";

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();

        const database = new CategoryDatasourceImpl();
        const categoryRepository = new CategoryRepositoryImpl(database);

        const controller = new CategoryController(categoryRepository);

        router.get("/", controller.getCategories);

        router.post("/", controller.createCategory);

        router.get("/:ctyid", controller.getCategoryById);

        router.put("/:ctyid", controller.updateCategoryById);

        router.patch("/:ctyid", controller.partialUpdateCategoryById);

        router.delete("/:ctyid", controller.deleteCategoryById);

        return router;
    }
}
