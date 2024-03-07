import { CustomError, ProductEntity } from "../../domain";

export class ProductMapper {
    static ProductEntityFromObject = (object: { [key: string]: any }) => {
        const { id, title, description, price, inStock, productImage, categories } = object;

        if (!id) {
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
        if (!inStock) {
            throw CustomError.badRequest("Missing stock quantity");
        }
        if (!productImage) {
            throw CustomError.badRequest("Missing product image");
        }
        if (!categories) {
            throw CustomError.badRequest("Missing category");
        }

        return new ProductEntity(id, title, description, price, inStock, productImage, categories);
    };
}
