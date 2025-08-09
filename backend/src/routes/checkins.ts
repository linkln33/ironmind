import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { VoiceCheckinSchema } from '../schemas/voice';

type CheckinRecord = ReturnType<typeof VoiceCheckinSchema.parse> & { id: string };
const memory: CheckinRecord[] = [];

export const checkinsRouter = Router();

checkinsRouter.post('/checkins', (req: Request, res: Response) => {
  const parse = VoiceCheckinSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'invalid_payload', details: parse.error.format() });
  }
  const payload: CheckinRecord = { id: randomUUID(), ...parse.data } as CheckinRecord;
  memory.push(payload);
  // Stub mood vector calculation for MVP scaffold
  const mood = payload.mood_vector ?? { sadness: 0.3, anxiety: 0.2, energy: 0.6 };
  return res.status(201).json({ id: payload.id, mood_vector: mood });
});

checkinsRouter.get('/checkins', (_req: Request, res: Response) => {
  res.json({ items: memory.slice(-100) });
});
