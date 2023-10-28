export class BeveragePartialDto {
    public name?: string;
    public description?: string;
    public price?: number;
    public category?: string;
    public thumbnail?: string;
    public status?: boolean;
    private constructor(partialData: Partial<BeveragePartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<BeveragePartialDto>): [string?, BeveragePartialDto?] {
        return [undefined, new BeveragePartialDto(partialData)];
    }
}
