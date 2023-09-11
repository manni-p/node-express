import { UserManager } from '../types';
import userInformationAction from './userInformation';
import mockUserManager from '../mocks/userManager.mock';

describe('userInformation', () => {
    it('should return user data', async () => {
        const id = 1;
        const name = 'test';
        const email = 'test@test.com';
        const loginType = 'email';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest
                .fn()
                .mockReturnValue({ id, name, email, loginType }),
        };

        const result = await userInformationAction(userManager, email);

        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            data: { id, name, email, loginType, initialSettingsExist: false },
            status: 200,
        });
    });

    it('should not get user data if email does not exist', async () => {
        const email = 'test@test.com';

        const userManager: UserManager = {
            ...mockUserManager,
            getUserByEmail: jest.fn().mockReturnValue(null),
        };

        const result = await userInformationAction(userManager, email);

        expect(userManager.getUserByEmail).toHaveBeenCalled();

        expect(result).toStrictEqual({
            error: 'There has been an error.',
            status: 400,
        });
    });
});
