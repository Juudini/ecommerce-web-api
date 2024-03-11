import { Router } from "express";
import { ProductRoutes } from "./product";
import { CategoryRoutes } from "./category";
import { AuthRoutes } from "./auth";
import multer from "multer";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const upload = multer();
        router.use("/api/products", ProductRoutes.routes);
        router.use("/api/categories", CategoryRoutes.routes);
        router.use("/api/users", AuthRoutes.routes);
        router.use("/upload", upload.single("file"), (req, res) => {
            console.log(req.file);
            res.send({ message: req.file });
        });

        return router;
    }
}
