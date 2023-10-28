export class DessertPartialDto {
    public name?: string;
    public description?: string;
    public price?: number;
    public type?: string;
    public thumbnail?: string;
    public status?: boolean;
    private constructor(partialData: Partial<DessertPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<DessertPartialDto>): [string?, DessertPartialDto?] {
        return [undefined, new DessertPartialDto(partialData)];
    }
}
