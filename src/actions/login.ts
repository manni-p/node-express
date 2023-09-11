import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserData, UserManager } from '../types';

const loginAction = async (
    { getUserByEmail }: UserManager,
    { email, password }: UserData,
    jwtToken: string
) => {
    const checkUser = await getUserByEmail(email);
    if (!checkUser) {
        return { error: 'invalid login details', status: 400 };
    }
    const checkPassword = await compare(
        password,
        checkUser?.password as string
    );

    if (!checkPassword) {
        return { error: 'invalid login details', status: 400 };
    }

    const data = {
        userId: checkUser.id,
    };

    const token = jwt.sign(data, jwtToken, { expiresIn: '1hr' });

    return { data: token, status: 200 };
};

export default loginAction;
