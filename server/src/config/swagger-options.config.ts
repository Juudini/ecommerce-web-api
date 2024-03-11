import { dirname, join } from "node:path";
import { envs } from "./env.config";

// Get the current file's path
const currentFilePath = __filename;
// Get the current directory (src/utils)
const currentDir = dirname(currentFilePath);
// Go up two levels over src folder
export const rootDirOverSrc = join(currentDir, "../../");

export const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "E-commerce API",
            version: "1.5.0",
            description: "A beautiful express library API"
        },
        servers: [{ url: `http://localhost:${envs.PORT}/api` }]
    },
    apis: [`${rootDirOverSrc}/docs/*ts`]
};
