import { rootDirOverSrc } from "../shared/path.utils";

export const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Pizzeria E-commerce API",
            version: "1.5.0",
            description: "A simple express library API"
        },
        servers: [{ url: "http://localhost:3000/api" }]
    },
    apis: [`${rootDirOverSrc}docs/*ts`]
};
