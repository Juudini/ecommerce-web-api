import { CategoryProps, ProductProps } from "../../types";

export class CategoryPartialDto implements CategoryProps {
    public id?: string;
    public title?: string;
    public product?: ProductProps[];

    private constructor(partialData: Partial<CategoryPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<CategoryPartialDto>): [string?, CategoryPartialDto?] {
        return [undefined, new CategoryPartialDto(partialData)];
    }
}
