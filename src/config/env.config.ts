import "dotenv/config";
import { get } from "env-var";

export const envs = {
    MODE: get("MODE").required().asString(),
    PORT: get("PORT").required().asPortNumber(),
    CLOUDINARY_NAME: get("CLOUDINARY_NAME").required().asString,
    CLOUDINARY_API_KEY: get("CLOUDINARY_API_KEY").required().asInt,
    CLOUDINARY_SECRET: get("CLOUDINARY_SECRET").required().asString
    // MONGODB_URI: get("MONGODB_URI").required().asString(),
    // DB_NAME: get("DB_NAME").required().asString()
};
