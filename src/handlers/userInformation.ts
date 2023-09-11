import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import buildUserManagerFactory from '../managers/userManager';
import userInformationAction from '../actions/userInformation';
import { User } from '../types';

const userInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const client = new PrismaClient();

    try {
        const userManagerFactory = buildUserManagerFactory(client);
        const userManager = userManagerFactory.getUserManager();
        const { email } = req.user as User;

        const result = await userInformationAction(userManager, email);

        return res.status(result.status).send(result);
    } catch (err) {
        return next(err);
    } finally {
        await client.$disconnect();
    }
};

export default userInformation;
