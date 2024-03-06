export interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
