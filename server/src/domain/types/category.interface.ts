import { ProductProps } from "./index";

export interface CategoryProps {
    id?: string;
    title?: string;
    product?: ProductProps[];
}
