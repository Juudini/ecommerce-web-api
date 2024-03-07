export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public roles: string[],
        public profile_image?: string
    ) {}
}
