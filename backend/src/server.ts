import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './routes/health';
import { checkinsRouter } from './routes/checkins';
import { habitsRouter } from './routes/habits';
import { goalsRouter } from './routes/goals';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.use('/api', healthRouter);
  app.use('/api', checkinsRouter);
  app.use('/api', habitsRouter);
  app.use('/api', goalsRouter);

  // 404
  app.use((_req: Request, res: Response) => res.status(404).json({ error: 'not_found' }));

  return app;
}
