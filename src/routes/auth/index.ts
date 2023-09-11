import { Router } from 'express';
// import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verify';
import login from '../../handlers/login';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.get('/validateToken', verifyToken, (req, res) => {
    return res.send('Successfully Verified');
});

export default authRouter;
