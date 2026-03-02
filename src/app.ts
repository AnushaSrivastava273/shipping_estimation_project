import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import routes from './routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

export default app;
