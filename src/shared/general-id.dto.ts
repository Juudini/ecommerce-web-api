import { logger } from "../config";
import { validate as uuidValidate } from "uuid";

export class GeneralIdDto {
    private constructor(public id: string) {}

    static create = (id: string): [string?, GeneralIdDto?] => {
        logger.info(uuidValidate(id));
        if (!uuidValidate(id)) {
            return ["Invalid UUID format"];
        }

        return [undefined, new GeneralIdDto(id)];
    };
}
