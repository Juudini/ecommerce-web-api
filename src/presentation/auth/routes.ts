import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        router.post("/signin", controller.signinUser);
        router.post("/signup", controller.signupUser);

        router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

        return router;
    }
}
