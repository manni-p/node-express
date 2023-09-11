import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { TOKEN_HEADER_KEY, JWT_SECRET_KEY } = process.env;
    const token = req.header(TOKEN_HEADER_KEY as string);

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY as string);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

export default verifyToken;
