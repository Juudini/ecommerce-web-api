import { SignupUserDto } from "../../../domain/dtos";
import { JwtAdapter } from "../../../libs/jwt";

import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserToken } from "../../../domain/types";

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface SignupUserUseCase {
    execute(signupUserDto: SignupUserDto): Promise<UserToken>;
}

export class SignupUser implements SignupUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(signupUserDto: SignupUserDto): Promise<UserToken> {
        // Crear usuario
        const user = await this.authRepository.signup(signupUserDto);

        // Token
        const token = await this.signToken({ id: user.id }, "2h");
        if (!token) throw CustomError.internalServer("Error generating token");

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.profile_image ?? "",
                roles: user.roles
            }
        };
    }
}
