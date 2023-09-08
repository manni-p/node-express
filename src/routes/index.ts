/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import userRouter from './users';

const projectRouter = Router();

projectRouter.use('/users', userRouter);

export default projectRouter;
