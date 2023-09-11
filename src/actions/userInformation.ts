import { UserManager } from '../types';

const userInformation = async (
    { getUserByEmail }: UserManager,
    email: string
) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return { error: 'There has been an error.', status: 400 };
    }

    return {
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            loginType: user.loginType,
            initialSettingsExist: false,
        },
        status: 200,
    };
};

export default userInformation;
