import { AuthDatasource, CustomError, SigninUserDto, SignupUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import prisma from "../../libs/prisma";
import { BcryptAdapter } from "../../libs/bcryptjs";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}

    async signin(signinUserDto: SigninUserDto): Promise<UserEntity> {
        const { email, password } = signinUserDto;

        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    name: true,
                    roles: true,
                    image: true,
                    isActive: true,
                    products: true,
                    emailVerified: true
                }
            });
            if (!user) throw CustomError.badRequest("User does not exists - email");

            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest("Password is not valid");

            return UserMapper.userEntityFromObject(user);
        } catch (err) {
            console.log(err);
            throw CustomError.internalServer();
        }
    }

    async signup(signupUserDto: SignupUserDto): Promise<UserEntity> {
        const { name, email, password } = signupUserDto;

        try {
            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) throw CustomError.badRequest("User already exists");

            const user = await prisma.user.create({
                data: { name: name, email: email, password: this.hashPassword(password) }
            });

            return UserMapper.userEntityFromObject(user);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            throw CustomError.internalServer();
        }
    }
}
