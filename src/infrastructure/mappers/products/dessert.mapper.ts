import { CustomError, DessertEntity } from "../../../domain";

export class DessertMapper {
    static DessertEntityFromObject = (object: { [key: string]: any }) => {
        const { id, _id, name, description, price, type, thumbnail, status } = object;

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
        if (!type) {
            throw CustomError.badRequest("Missing type");
        }
        if (!thumbnail) {
            throw CustomError.badRequest("Missing thumbnail");
        }
        if (status === undefined) {
            throw CustomError.badRequest("Missing status");
        }

        return new DessertEntity(id || _id, name, description, price, type, thumbnail, status);
    };
}
