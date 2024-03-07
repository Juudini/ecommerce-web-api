import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
    static userEntityFromObject(object: { [key: string]: any }) {
        const { id, name, email, password, roles, profile_image } = object;

        if (!id) {
            throw CustomError.badRequest("Missing id");
        }
        if (!name) throw CustomError.badRequest("Missing name");
        if (!email) throw CustomError.badRequest("Missing email");
        if (!password) throw CustomError.badRequest("Missing password");
        if (!roles) throw CustomError.badRequest("Missing roles");

        return new UserEntity(id, name, email, password, roles, profile_image);
    }
}
