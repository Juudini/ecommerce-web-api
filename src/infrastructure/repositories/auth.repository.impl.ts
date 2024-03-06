import { AuthDatasource, AuthRepository, SigninUserDto, SignupUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) {}

    signin(signinUserDto: SigninUserDto): Promise<UserEntity> {
        return this.authDatasource.signin(signinUserDto);
    }

    signup(signupUserDto: SignupUserDto): Promise<UserEntity> {
        return this.authDatasource.signup(signupUserDto);
    }
}
