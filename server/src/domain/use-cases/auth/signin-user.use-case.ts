import { JwtAdapter } from "../../../libs/jwt";
import { SigninUserDto } from "../../dtos/auth/signin-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserToken } from "../../../domain/types";

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface SigninUserUseCase {
    execute(registerUserDto: SigninUserDto): Promise<UserToken>;
}

export class SigninUser implements SigninUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(signinUserDto: SigninUserDto): Promise<UserToken> {
        // Crear usuario
        const user = await this.authRepository.signin(signinUserDto);

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
