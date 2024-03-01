import { CustomError, ProductEntity } from "../../domain";

export class ProductMapper {
    static ProductEntityFromObject = (object: { [key: string]: any }) => {
        const { id, _id, title, description, price, type, thumbnail, status } = object;

        if (!_id || !id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!title) {
            throw CustomError.badRequest("Missing title");
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

        return new ProductEntity(id || _id, title, description, price, type, thumbnail, status);
    };
}
