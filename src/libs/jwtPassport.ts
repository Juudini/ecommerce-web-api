import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
const SECRET_KEY = "MagicianToken";

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
        token = req.cookies["MagicianToken"];
    }
    return token;
};

export default jwtPassportInitialize;
