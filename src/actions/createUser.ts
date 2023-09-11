import { hash } from 'bcryptjs';
import { UserData, UserManager } from '../types';

const createUserAction = async (
    { createUser, getUserByEmail }: UserManager,
    { name, email, password }: UserData
) => {
    const checkUser = await getUserByEmail(email);
    if (checkUser) {
        return { error: 'email address already exists.', status: 400 };
    }

    if (password.length < 6) {
        return { error: 'Password is less than 6 characters', status: 400 };
    }

    const hashPassword = await hash(password, 10);

    const user = await createUser({ name, email, password: hashPassword });
    return { data: { email: user.email, name: user.name }, status: 200 };
};

export default createUserAction;
