import { Validators } from "../../../shared";

export class SignupUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    static create(object: { [key: string]: any }): [string?, SignupUserDto?] {
        const { name, email, password } = object;

        if (!name) return ["Missing name"];
        if (!email) return ["Missing email"];
        if (!Validators.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Missing password"];
        if (password.length < 6) return ["Password too short"];

        return [undefined, new SignupUserDto(name, email, password)];
    }
}
