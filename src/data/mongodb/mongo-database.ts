import { connect } from "mongoose";
import { logger } from "../../config";
interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { mongoUrl, dbName } = options;
        try {
            await connect(mongoUrl, { dbName: dbName });
            logger.info("🔌 DB connected");
            return true;
        } catch (error) {
            logger.error("Error in MongoDB connect. Details: ", error);
            throw error;
        }
    }
}
