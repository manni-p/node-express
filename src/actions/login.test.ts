import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserManager } from '../types';
import loginAction from './login';
import mockUserManager from '../mocks/userManager.mock';

// Mock the bcryptjs compare function
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

// Mock the jsonwebtoken sign function
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('login', () => {
    it('should return jwt token on successful login', async () => {
        const id = 1;
        const email = 'test@test.com';
        const password = 'password';
        const mockJwtToken = 'mockJwtToken';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue({ id, email, password }),
        };

        (compare as jest.Mock).mockResolvedValue(true);

        (jwt.sign as jest.Mock).mockReturnValue('mockToken');

        const result = await loginAction(
            userManager,
            {
                email,
                password,
            },
            mockJwtToken
        );

        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            data: 'mockToken',
            status: 200,
        });
    });

    it('should return invalid login due to incorrect email.', async () => {
        const email = 'test@test.com';
        const mockJwtToken = 'mockJwtToken';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue(null),
        };

        (compare as jest.Mock).mockResolvedValue(true);

        (jwt.sign as jest.Mock).mockReturnValue('mockToken');

        const result = await loginAction(
            userManager,
            {
                email,
                password: 'password',
            },
            mockJwtToken
        );

        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            error: 'invalid login details',
            status: 400,
        });
    });

    it('should return invalid login due to incorrect password', async () => {
        const id = 1;
        const email = 'test@test.com';
        const password = 'password';
        const mockJwtToken = 'mockJwtToken';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue({ id, email, password }),
        };

        (compare as jest.Mock).mockResolvedValue(false);

        (jwt.sign as jest.Mock).mockReturnValue('mockToken');

        const result = await loginAction(
            userManager,
            {
                email,
                password: 'passwordWrong',
            },
            mockJwtToken
        );

        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            error: 'invalid login details',
            status: 400,
        });
    });
});
