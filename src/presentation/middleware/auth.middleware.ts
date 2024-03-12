import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../libs/jwt";
import prisma from "../../libs/prisma";

export class AuthMiddleware {
    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header("Authorization");
        if (!authorization) return res.status(401).json({ err: "No token provided" });
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ err: "Invalid Bearer token" });

        const token = authorization.split(" ").at(1) || "";

        try {
            // todo:
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ err: "Invalid token" });

            const user = await prisma.user.findUnique({ where: { id: payload.id } });
            if (!user) return res.status(401).json({ err: "Invalid token - user not found" });

            req.body.user = user;

            next();
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: "Internal server err" });
        }
    };
}
