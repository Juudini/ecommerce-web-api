export class GeneralIdDto {
    private constructor(public id: string) {}
    static create = (id: string): [string?, GeneralIdDto?] => {
        if (id.length <= 23) return ["Id too short"];

        return [undefined, new GeneralIdDto(id)];
    };
}
