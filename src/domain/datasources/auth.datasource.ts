import { SigninUserDto, SignupUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class AuthDatasource {
    abstract signin(signinUserDto: SigninUserDto): Promise<UserEntity>;
    abstract signup(signupUserDto: SignupUserDto): Promise<UserEntity>;
}
