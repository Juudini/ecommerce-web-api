import { CategoryProps } from "./index";
import { ProductImageProps } from "./index";

export interface ProductProps {
    id?: string;
    title?: string;
    description?: string;
    inStock?: number;
    price?: number;
    product_images?: ProductImageProps[];
    categories?: CategoryProps[];
}
