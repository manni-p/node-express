export type UserData = {
    email: string;
    name?: string;
    password: string;
};

export type User = {
    id: number;
    email: string;
    name?: string | null;
    loginType: string;
};

export interface UserPassword extends User {
    password: string;
}

export type UserManager = {
    getUsers: () => Promise<User[]>;
    createUser: (userData: UserData) => Promise<User>;
    getUserByEmail: (email: string) => Promise<UserPassword | null>;
};
