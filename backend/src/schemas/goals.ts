import { z } from 'zod';

export const GoalSchema = z.object({
  goal_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().default(''),
  start_date: z.string(),
  target_date: z.string(),
  status: z.enum(['active', 'paused', 'completed']).default('active'),
  kpis: z.array(z.string()).default([]),
  availability: z.object({
    weekday_hours: z.number().nonnegative().default(0),
    weekend_hours: z.number().nonnegative().default(0),
  }).optional(),
}).strict();

export const TaskSchema = z.object({
  task_id: z.string().uuid().optional(),
  goal_id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1),
  duration_min: z.number().int().positive().default(25),
  difficulty: z.number().int().min(1).max(5).default(3),
  scheduled_for: z.string().optional(), // ISO8601
  completed_at: z.string().nullable().optional(),
  mode: z.enum(['grind', 'recovery']).default('grind'),
}).strict();

export type Goal = z.infer<typeof GoalSchema>;
export type Task = z.infer<typeof TaskSchema>;
