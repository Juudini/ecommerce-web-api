export class ProductIdDto {
    private constructor(public id: string) {}
    static create = (id: string): [string?, ProductIdDto?] => {
        if (id.length <= 23) return ["Id too short"];

        return [undefined, new ProductIdDto(id)];
    };
}
