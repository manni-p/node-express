import { Router } from 'express';
import userRouter from './users';
import authRouter from './auth';

const projectRouter = Router();

projectRouter.use('/users', userRouter);
projectRouter.use('/auth', authRouter);

export default projectRouter;
