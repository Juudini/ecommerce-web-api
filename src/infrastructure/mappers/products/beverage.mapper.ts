import { CustomError, BeverageEntity } from "../../../domain";

export class BeverageMapper {
    static BeverageEntityFromObject = (object: { [key: string]: any }) => {
        const { id, _id, name, description, price, category, thumbnail, status } = object;

        if (!_id || !id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!name) {
            throw CustomError.badRequest("Missing name");
        }
        if (!description) {
            throw CustomError.badRequest("Missing description");
        }
        if (!price) {
            throw CustomError.badRequest("Missing price");
        }
        if (!category) {
            throw CustomError.badRequest("Missing category");
        }
        if (!thumbnail) {
            throw CustomError.badRequest("Missing thumbnail");
        }
        if (status === undefined) {
            throw CustomError.badRequest("Missing status");
        }

        return new BeverageEntity(id || _id, name, description, price, category, thumbnail, status);
    };
}
