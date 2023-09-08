export type UserData = {
    email: string;
    name?: string;
};

export type User = {
    id: number;
    email: string;
    name?: string | null;
};

export type UserManager = {
    getUsers: () => Promise<User[]>;
    createUser: (userData: UserData) => Promise<User>;
    getUserByEmail: (email: string) => Promise<User | null>;
};
