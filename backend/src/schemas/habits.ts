import { z } from 'zod';

export const HabitEventSchema = z.object({
  user_id: z.string().uuid(),
  timestamp: z.string(), // ISO 8601
  habit_type: z.enum(['smoking', 'alcohol', 'porn', 'gaming', 'other']),
  quantity: z.number().int().nonnegative().default(0),
  context: z.record(z.any()).optional(),
}).strict();

export type HabitEvent = z.infer<typeof HabitEventSchema>;
