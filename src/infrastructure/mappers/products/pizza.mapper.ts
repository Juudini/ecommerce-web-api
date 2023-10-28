import { CustomError, PizzaEntity } from "../../../domain";

export class PizzaMapper {
    static PizzaEntityFromObject = (object: { [key: string]: any }) => {
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

        return new PizzaEntity(id || _id, name, description, price, type, thumbnail, status);
    };
}
