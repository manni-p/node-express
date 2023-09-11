import { PrismaClient } from '@prisma/client';
import { UserData, UserManager } from '../types';

export type UserManagerFactory = {
    getUserManager: () => UserManager;
};

const buildUserManagerFactory = (client: PrismaClient): UserManagerFactory => ({
    getUserManager: (): UserManager => ({
        getUsers: async () => {
            const users = await client.user.findMany();

            return users;
        },
        createUser: async ({ name, email, password }: UserData) => {
            const user = await client.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            return user;
        },
        getUserByEmail: async (email: string) => {
            const userExists = client.user.findUnique({
                where: {
                    email,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: true,
                    loginType: true,
                },
            });

            return userExists;
        },
    }),
});

export default buildUserManagerFactory;
