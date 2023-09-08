import { Router } from 'express';
import createUser from '../../handlers/createUser';

const userRouter = Router();

userRouter.post('/', createUser);

export default userRouter;
