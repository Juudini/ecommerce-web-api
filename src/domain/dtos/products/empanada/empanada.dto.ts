export class EmpanadaDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public thumbnail?: string,
        public status?: boolean
    ) {}
    static create = (object: { [key: string]: any }): [string?, EmpanadaDto?] => {
        const { name, description, price, thumbnail, status } = object;

        if (!name) return ["Missing name"];
        if (name.length < 3) return ["Name too short"];
        if (name.length > 50) return ["Name too long"];

        if (!description) return ["Missing description"];
        else if (description.length > 250) return ["Description too long"];

        if (!price) return ["Missing price"];
        else if (typeof price !== "number") return ["Invalid price"];

        if (status && typeof status !== "boolean") {
            return ["Invalid status"];
        }

        return [undefined, new EmpanadaDto(name, description, price, thumbnail, status)];
    };
}
