import { UserManager } from '../types';
import createUserAction from './createUser';

const mockUserManager: UserManager = {
    getUsers: async () => ({} as never),
    createUser: () => ({} as never),
    getUserByEmail: async () => ({} as never),
};

describe('createUser', () => {
    it('should return user data on successful creation', async () => {
        const id = 1;
        const name = 'test';
        const email = 'test@test.com';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue(null),
            createUser: jest.fn().mockReturnValue({ id, name, email }),
        };

        const result = await createUserAction(userManager, { name, email });

        expect(userManager.createUser).toHaveBeenCalled();
        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            data: { id: 1, name, email },
            status: 200,
        });
    });

    it('should not create user and fail on user exists', async () => {
        const id = 1;
        const name = 'test';
        const email = 'test@test.com';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue({ id, name, email }),
            createUser: jest.fn().mockReturnValue(null),
        };

        const result = await createUserAction(userManager, { name, email });
        expect(userManager.createUser).not.toHaveBeenCalled();
        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            error: 'email address already exists.',
            status: 400,
        });
    });
});