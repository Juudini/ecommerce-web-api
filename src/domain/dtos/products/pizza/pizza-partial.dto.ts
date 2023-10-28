export class PizzaPartialDto {
    public name?: string;
    public description?: string;
    public price?: number;
    public type?: string;
    public thumbnail?: string;
    public status?: boolean;
    private constructor(partialData: Partial<PizzaPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<PizzaPartialDto>): [string?, PizzaPartialDto?] {
        return [undefined, new PizzaPartialDto(partialData)];
    }
}
