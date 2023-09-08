import serverless from 'serverless-http';
import app from './app';

const { API_BASEPATH } = process.env;

export const handler = serverless(app, {
    basePath: `/${API_BASEPATH}`,
});

export default handler;
