import Express, { Router } from "express";
import cors from "cors";
import morgan from "morgan";

// Swagger
import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { logger, swaggerOptions } from "../config"; // Winston and Swagger

interface Options {
    port: number;
    routes: Router;
}

export default class Server {
    public readonly app = Express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        /* ★━━━━━━━━━━━★ Middlewares ★━━━━━━━━━━━★ */
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));

        /* ★━━━━━━━━━━━★ Swagger Docs ★━━━━━━━━━━━★ */
        const swaggerSpecs = swaggerJSDoc(swaggerOptions);

        /* ★━━━━━━━━━━━★ Routes ★━━━━━━━━━━━★ */
        this.app.use(this.routes);

        this.app.use("/api/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpecs));
        logger.info("📚 Swagger documentation is available at: http://localhost:3000/api/docs");

        /* ★━━━━━━━━━━━★ Listener ★━━━━━━━━━━━★ */
        this.app.listen(this.port, () => {
            logger.info(`🚀 Server running on port ${this.port}.`);
        });
    }
}
