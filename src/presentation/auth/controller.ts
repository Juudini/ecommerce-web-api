import { Request, Response } from "express";
import { AuthRepository, CustomError, SigninUser, SigninUserDto, SignupUser, SignupUserDto } from "../../domain";
import prisma from "@/libs/prisma";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    signupUser = (req: Request, res: Response) => {
        const [err, signupUserDto] = SignupUserDto.create(req.body);
        if (err) return res.status(400).json({ err });

        new SignupUser(this.authRepository)
            .execute(signupUserDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    signinUser = (req: Request, res: Response) => {
        const [err, signinUserDto] = SigninUserDto.create(req.body);
        if (err) return res.status(400).json({ err });

        new SigninUser(this.authRepository)
            .execute(signinUserDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getUsers = (req: Request, res: Response) => {
        prisma.user
            .findMany()
            .then(users => {
                res.json({
                    users,
                    user: req.body.user
                });
            })
            .catch(() => res.status(500).json({ err: "Internal server err" }));
    };
}
