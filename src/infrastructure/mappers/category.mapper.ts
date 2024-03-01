import { CustomError, CategoryEntity } from "../../domain";

export class CategoryMapper {
    static CategoryEntityFromObject = (object: { [key: string]: any }) => {
        const { id, _id, title, products } = object;

        if (!_id || !id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!title) {
            throw CustomError.badRequest("Missing title");
        }
        if (!title) {
            throw CustomError.badRequest("Missing description");
        }

        return new CategoryEntity(id || _id, title, products);
    };
}
