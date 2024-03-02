import { CategoryProps, ProductImageProps, ProductProps } from "../../types";

export class ProductPartialDto implements ProductProps {
    public id?: string;
    public title?: string;
    public description?: string;
    public price?: string;
    public inStock?: number;
    public categories?: CategoryProps[];
    public product_image?: ProductImageProps[];

    private constructor(partialData: Partial<ProductPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<ProductPartialDto>): [string?, ProductPartialDto?] {
        return [undefined, new ProductPartialDto(partialData)];
    }
}
