//Todo: Validations wiht ZOD
export class CategoryDto {
    private constructor(public title: string) {}

    static create = (object: { [key: string]: any }): [string?, CategoryDto?] => {
        const { title } = object;

        if (!title) return ["Missing title"];
        if (title.length < 3) return ["title too short"];
        if (title.length > 50) return ["title too long"];

        return [undefined, new CategoryDto(title)];
    };
}
