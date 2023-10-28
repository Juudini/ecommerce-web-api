export class EmpanadaPartialDto {
    public name?: string;
    public description?: string;
    public price?: number;
    public thumbnail?: string;
    public status?: boolean;
    private constructor(partialData: Partial<EmpanadaPartialDto>) {
        Object.assign(this, partialData);
    }
    static create(partialData: Partial<EmpanadaPartialDto>): [string?, EmpanadaPartialDto?] {
        return [undefined, new EmpanadaPartialDto(partialData)];
    }
}
