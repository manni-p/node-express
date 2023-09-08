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
        createUser: async ({ name, email }: UserData) => {
            const user = await client.user.create({
                data: {
                    name,
                    email,
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
                },
            });

            return userExists;
        },
    }),
});

const mockUserManager: UserManager = {
    getUsers: async () => ({} as never),
    createUser: () => ({} as never),
    getUserByEmail: async () => ({} as never),
};

export default buildUserManagerFactory;
export { mockUserManager };
