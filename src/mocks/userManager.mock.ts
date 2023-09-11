import { UserManager } from '../types';

const mockUserManager: UserManager = {
    getUsers: async () => ({} as never),
    createUser: () => ({} as never),
    getUserByEmail: async () => ({} as never),
};

export default mockUserManager;
