import { ProductProps } from "../../types";

//Todo: hacerVALIDACIONES CON ZOD
export class CategoryDto {
    private constructor(
        public title: string,
        public products?: ProductProps[]
    ) {}

    static create = (object: { [key: string]: any }): [string?, CategoryDto?] => {
        const { title, products } = object;

        if (!title) return ["Missing title"];
        if (title.length < 3) return ["title too short"];
        if (title.length > 50) return ["title too long"];

        return [undefined, new CategoryDto(title, products)];
    };
}
