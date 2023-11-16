import { envs, logger } from "./config";
import { MongoDatabase } from "./data/mongodb";
import Server from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(() => {
    main();
})();

async function main() {
    try {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGODB_URI,
            dbName: envs.DB_NAME
        });
        new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
    } catch (err) {
        logger.error(err);
    }
}
