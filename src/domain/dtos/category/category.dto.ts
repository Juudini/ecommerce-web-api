import { ProductProps } from "../../types";

export class CategoryDto {
    private constructor(
        public title: string,
        public products?: ProductProps[]
    ) {}

    static create = (object: { [key: string]: any }): [string?, CategoryDto?] => {
        const { title, products } = object;

        return [undefined, new CategoryDto(title, products)];
    };
}
