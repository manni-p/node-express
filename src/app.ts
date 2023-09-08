import express, { Request, Response, json, NextFunction } from 'express';
import cors from 'cors';
import productsRouter from './routes';

const app = express();

app.use(cors());

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/', json({ type: () => true }), productsRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.error({
        level: 'ERROR',
        url: req.url,
        body: req.body,
        stack: err.stack,
    });
    res.status(500).send('Internal Server Error');
});

export default app;
