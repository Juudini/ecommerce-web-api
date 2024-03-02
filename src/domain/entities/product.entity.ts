import { CategoryProps, ProductImageProps } from "../types";

export class ProductEntity {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: string,
        public inStock: number,
        public productImage?: ProductImageProps[],
        public categories?: CategoryProps[]
    ) {}
}
