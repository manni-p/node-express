import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import buildUserManagerFactory from '../managers/userManager';
import createUserAction from '../actions/createUser';

const getBasket = async (req: Request, res: Response, next: NextFunction) => {
    const client = new PrismaClient();

    try {
        const payloadSchema = z.object({
            name: z.string().optional(),
            email: z.string().email(),
        });

        const params = payloadSchema.parse(req.body);

        const userManagerFactory = buildUserManagerFactory(client);
        const userManager = userManagerFactory.getUserManager();

        const result = await createUserAction(userManager, params);

        return res.status(result.status).send(result);
    } catch (err) {
        return next(err);
    } finally {
        await client.$disconnect();
    }
};

export default getBasket;
