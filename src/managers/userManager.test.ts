import { PrismaClient } from '@prisma/client';
import buildUserManagerFactory from './userManager';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => ({
            user: {
                findMany: jest.fn(),
                create: jest.fn(),
                findUnique: jest.fn(),
            },
        })),
    };
});

describe('buildUserManagerFactory', () => {
    let prismaClient: PrismaClient;

    beforeEach(() => {
        prismaClient = new PrismaClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a UserManagerFactory', () => {
        const userManagerFactory = buildUserManagerFactory(prismaClient);
        expect(userManagerFactory).toBeDefined();
    });

    it('should create a UserManager with getUsers, createUser, and getUserByEmail', () => {
        const userManagerFactory = buildUserManagerFactory(prismaClient);
        const userManager = userManagerFactory.getUserManager();

        expect(userManager).toBeDefined();
        expect(userManager.getUsers).toBeDefined();
        expect(userManager.createUser).toBeDefined();
        expect(userManager.getUserByEmail).toBeDefined();
    });

    it('should call PrismaClient.user.findMany when getUsers is called', async () => {
        const userManagerFactory = buildUserManagerFactory(prismaClient);
        const userManager = userManagerFactory.getUserManager();

        await userManager.getUsers();

        expect(prismaClient.user.findMany).toHaveBeenCalled();
    });

    it('should call PrismaClient.user.create when createUser is called', async () => {
        const userManagerFactory = buildUserManagerFactory(prismaClient);
        const userManager = userManagerFactory.getUserManager();
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
        };

        await userManager.createUser(userData);

        expect(prismaClient.user.create).toHaveBeenCalledWith({
            data: userData,
        });
    });

    it('should call PrismaClient.user.findUnique when getUserByEmail is called', async () => {
        const userManagerFactory = buildUserManagerFactory(prismaClient);
        const userManager = userManagerFactory.getUserManager();
        const email = 'john@example.com';

        await userManager.getUserByEmail(email);

        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
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
    });
});
