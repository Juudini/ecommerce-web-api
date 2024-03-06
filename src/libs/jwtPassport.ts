import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { envs } from "../config";
const SECRET_KEY = envs.SECRET_KEY;

const jwtPassportInitialize = () => {
    passport.use(
        "jwt",
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: SECRET_KEY
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (err) {
                    done(err);
                }
            }
        )
    );
};

const cookieExtractor = (req: any) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[SECRET_KEY];
    }
    return token;
};

export default jwtPassportInitialize;
