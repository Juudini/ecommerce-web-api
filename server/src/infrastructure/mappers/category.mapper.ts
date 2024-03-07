import { CustomError, CategoryEntity } from "../../domain";

export class CategoryMapper {
    static CategoryEntityFromObject = (object: { [key: string]: any }) => {
        const { id, title, products } = object;

        if (!id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!title) {
            throw CustomError.badRequest("Missing title");
        }

        return new CategoryEntity(id, title, products);
    };
}
