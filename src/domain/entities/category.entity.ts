import { ProductProps } from "../types";

export class CategoryEntity {
    constructor(
        public id: string,
        public title: string,
        public products?: ProductProps[]
    ) {}
}
