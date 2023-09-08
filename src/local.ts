import 'dotenv/config';
import express from 'express';
import app from './app';

const port = 3132;

const { API_BASEPATH } = process.env;

const url = `http://localhost:${port}/${API_BASEPATH}`;
const localApp = express();
localApp.use(`/${API_BASEPATH}`, app);
localApp.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Running on port ${url} \n health check: ${url}/health`)
);
