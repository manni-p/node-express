import { UserManager } from '../types';
import { mockUserManager } from '../managers/userManager';
import createUserAction from './createUser';

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

//     it('should return basket items when on a team with only a team balance', async () => {
//         const basketId = 'a-1';
//         const amount = 20;
//         const currency = 'JUN';

//         const tickittoManager: TickittoManager = {
//             ...mockTickittoManager,
//             fetchTickittoEvent: jest.fn().mockReturnValue(undefined),
//             getBasket: jest.fn().mockReturnValue({
//                 amount,
//                 currency,
//             }),
//         };

//         const userManager: UserManager = {
//             ...mockUserManager,
//             getUser: jest.fn().mockReturnValue({
//                 id: 352,
//                 email: 'mary@gmail.com',
//                 personalPoints: 0,
//             }),
//         };

//         const teamManager: TeamManager = {
//             ...mockTeamManager,
//             getTeamMember: jest.fn().mockReturnValue({
//                 points: 15,
//                 teamMemberStatus: 'active',
//                 subStatus: 'active',
//             }),
//         };

//         const basket = await getBasketAction(
//             tickittoManager,
//             userManager,
//             352,
//             basketId,
//             teamManager
//         );

//         expect(tickittoManager.getBasket).toHaveBeenCalled();

//         expect(basket).toStrictEqual({
//             basketContents: { amount, currency },
//             sufficientPoints: false,
//         });
//     });

//     it('should return basket items when on a team with only a team balance', async () => {
//         const basketId = 'a-1';
//         const amount = 20;
//         const currency = 'JUN';

//         const tickittoManager: TickittoManager = {
//             ...mockTickittoManager,
//             fetchTickittoEvent: jest.fn().mockReturnValue(undefined),
//             getBasket: jest.fn().mockReturnValue({
//                 amount,
//                 currency,
//             }),
//         };

//         const userManager: UserManager = {
//             ...mockUserManager,
//             getUser: jest.fn().mockReturnValue({
//                 id: 352,
//                 email: 'mary@gmail.com',
//                 personalPoints: 4,
//             }),
//         };

//         const teamManager: TeamManager = {
//             ...mockTeamManager,
//             getTeamMember: jest.fn().mockReturnValue({
//                 points: 15,
//                 teamMemberStatus: 'active',
//                 subStatus: 'active',
//             }),
//         };

//         const basket = await getBasketAction(
//             tickittoManager,
//             userManager,
//             352,
//             basketId,
//             teamManager
//         );

//         expect(tickittoManager.getBasket).toHaveBeenCalled();

//         expect(basket).toStrictEqual({
//             basketContents: { amount, currency },
//             sufficientPoints: false,
//         });
//     });

//     it('should return basket items when not on a team', async () => {
//         const basketId = 'a-1';
//         const amount = 20;
//         const currency = 'JUN';

//         const tickittoManager: TickittoManager = {
//             ...mockTickittoManager,
//             fetchTickittoEvent: jest.fn().mockReturnValue(undefined),
//             getBasket: jest.fn().mockReturnValue({
//                 amount,
//                 currency,
//             }),
//         };

//         const userManager: UserManager = {
//             ...mockUserManager,
//             getUser: jest.fn().mockReturnValue({
//                 id: 352,
//                 email: 'mary@gmail.com',
//                 personalPoints: 19,
//             }),
//         };

//         const basket = await getBasketAction(
//             tickittoManager,
//             userManager,
//             352,
//             basketId
//         );

//         expect(tickittoManager.getBasket).toHaveBeenCalled();

//         expect(basket).toStrictEqual({
//             basketContents: { amount, currency },
//             sufficientPoints: false,
//         });
//     });
// });
