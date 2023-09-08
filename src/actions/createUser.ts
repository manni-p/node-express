import { UserData, UserManager } from '../types';

const createUserAction = async (
    { createUser, getUserByEmail }: UserManager,
    { name, email }: UserData
) => {
    const checkUser = await getUserByEmail(email);
    if (checkUser) {
        return { error: 'email address already exists.', status: 400 };
    }

    const user = await createUser({ name, email });
    return { data: user, status: 200 };
};

export default createUserAction;
