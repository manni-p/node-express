import { Router } from 'express';
import createUser from '../../handlers/createUser';
import userInformation from '../../handlers/userInformation';
import verifyToken from '../../middleware/verify';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/me', verifyToken, userInformation);

export default userRouter;
