import { describe, expect, jest, test } from "@jest/globals";
import { Server } from "../src/presentation/server";
import { envs } from "../src/config";
import { MongoDatabase } from "../src/data";

jest.mock("../src/data/mongodb/index");
jest.mock("../src/presentation/server");

describe("Test in the App file", () => {
    test("should connect to MongoDB successfully", async () => {
        await MongoDatabase.connect({
            dbName: envs.DB_NAME,
            mongoUrl: envs.MONGODB_URI
        });
        expect(MongoDatabase).toBeTruthy();
    });

    test("should call server with arguments and start", async () => {
        await import("../src/app");
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalled();
    });
});
