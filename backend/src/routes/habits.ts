import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { HabitEventSchema } from '../schemas/habits';

type HabitRecord = ReturnType<typeof HabitEventSchema.parse> & { id: string };
const memory: HabitRecord[] = [];

export const habitsRouter = Router();

habitsRouter.post('/habits', (req: Request, res: Response) => {
  const parse = HabitEventSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'invalid_payload', details: parse.error.format() });
  }
  const payload: HabitRecord = { id: randomUUID(), ...parse.data } as HabitRecord;
  memory.push(payload);
  return res.status(201).json({ id: payload.id });
});

habitsRouter.get('/habits', (_req: Request, res: Response) => {
  res.json({ items: memory.slice(-200) });
});
