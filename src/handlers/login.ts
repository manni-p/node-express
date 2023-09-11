import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import buildUserManagerFactory from '../managers/userManager';
import loginAction from '../actions/login';

const login = async (req: Request, res: Response, next: NextFunction) => {
    const client = new PrismaClient();
    const { JWT_SECRET_KEY } = process.env;
    try {
        const payloadSchema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const params = payloadSchema.parse(req.body);

        const userManagerFactory = buildUserManagerFactory(client);
        const userManager = userManagerFactory.getUserManager();

        const result = await loginAction(
            userManager,
            params,
            JWT_SECRET_KEY as string
        );

        return res.status(result.status).send(result);
    } catch (err) {
        return next(err);
    } finally {
        await client.$disconnect();
    }
};

export default login;
