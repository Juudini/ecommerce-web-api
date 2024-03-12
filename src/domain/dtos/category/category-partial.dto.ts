import { CategoryProps } from "../../types";

export class CategoryPartialDto implements CategoryProps {
    public title?: string;

    private constructor(partialData: Partial<CategoryPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<CategoryPartialDto>): [string?, CategoryPartialDto?] {
        return [undefined, new CategoryPartialDto(partialData)];
    }
}
