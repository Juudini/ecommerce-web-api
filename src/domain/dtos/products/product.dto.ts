import { CategoryProps, ProductImageProps } from "../../types";

export class ProductDto {
    private constructor(
        public title: string,
        public description: string,
        public price: string,
        public inStock: number,
        public id?: string,
        public product_image?: ProductImageProps[],
        public categories?: CategoryProps[]
    ) {}
    static create = (object: { [key: string]: any }): [string?, ProductDto?] => {
        const { id, title, description, price, inStock, product_image, categories } = object;

        if (!title) return ["Missing title"];
        if (title.length < 3) return ["title too short"];
        if (title.length > 50) return ["title too long"];

        if (!description) return ["Missing description"];
        else if (description.length > 250) return ["Description too long"];

        if (!price) return ["Missing price"];
        else if (typeof price !== "string") return ["Invalid price"];

        return [undefined, new ProductDto(title, description, price, inStock, id, product_image, categories)];
    };
}
