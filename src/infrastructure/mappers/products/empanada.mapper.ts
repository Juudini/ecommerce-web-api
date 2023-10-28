import { CustomError, EmpanadaEntity } from "../../../domain";

export class EmpanadaMapper {
    static EmpanadaEntityFromObject = (object: { [key: string]: any }) => {
        const { id, _id, name, description, price, thumbnail, status } = object;

        if (!_id || !id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!name) {
            throw CustomError.badRequest("Missing name");
        }
        if (!description) {
            throw CustomError.badRequest("Missing description");
        }
        if (!price) {
            throw CustomError.badRequest("Missing price");
        }
        if (!thumbnail) {
            throw CustomError.badRequest("Missing thumbnail");
        }
        if (status === undefined) {
            throw CustomError.badRequest("Missing status");
        }

        return new EmpanadaEntity(id || _id, name, description, price, thumbnail, status);
    };
}
