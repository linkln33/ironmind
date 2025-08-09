import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { GoalSchema, TaskSchema } from '../schemas/goals';

type GoalRecord = ReturnType<typeof GoalSchema.parse> & { goal_id: string };
type TaskRecord = ReturnType<typeof TaskSchema.parse> & { task_id: string };

const goals: Record<string, GoalRecord> = {};
const tasks: Record<string, TaskRecord> = {};

export const goalsRouter = Router();

// Goals

goalsRouter.post('/goals', (req: Request, res: Response) => {
  const parse = GoalSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'invalid_payload', details: parse.error.format() });
  const id = randomUUID();
  const goal: GoalRecord = { ...parse.data, goal_id: id } as GoalRecord;
  goals[id] = goal;
  return res.status(201).json(goal);
});

goalsRouter.get('/goals', (_req: Request, res: Response) => {
  res.json({ items: Object.values(goals) });
});

// Tasks

goalsRouter.post('/tasks', (req: Request, res: Response) => {
  const parse = TaskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'invalid_payload', details: parse.error.format() });
  const id = randomUUID();
  const task: TaskRecord = { ...parse.data, task_id: id } as TaskRecord;
  tasks[id] = task;
  return res.status(201).json(task);
});

goalsRouter.get('/tasks', (_req: Request, res: Response) => {
  res.json({ items: Object.values(tasks) });
});
