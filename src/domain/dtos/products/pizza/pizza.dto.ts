export class PizzaDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public type: string,
        public thumbnail?: string,
        public status?: boolean
    ) {}
    static create = (object: { [key: string]: any }): [string?, PizzaDto?] => {
        const { name, description, price, type, thumbnail, status } = object;

        if (!name) return ["Missing name"];
        if (name.length < 3) return ["Name too short"];
        if (name.length > 50) return ["Name too long"];

        if (!description) return ["Missing description"];
        else if (description.length > 250) return ["Description too long"];

        if (!price) return ["Missing price"];
        else if (typeof price !== "number") return ["Invalid price"];

        if (type && type !== "whole" && type !== "half") return ["Invalid type"];

        if (status && typeof status !== "boolean") return ["Invalid status"];

        return [undefined, new PizzaDto(name, description, price, type, thumbnail, status)];
    };
}
