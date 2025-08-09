import { z } from 'zod';

export const MoodVectorSchema = z.object({
  sadness: z.number().min(0).max(1),
  anxiety: z.number().min(0).max(1),
  energy: z.number().min(0).max(1),
}).strict();

export const VoiceFeaturesSchema = z.object({
  pitch_median: z.number().optional(),
  energy: z.number().optional(),
}).strict();

export const ConsentFlagsSchema = z.object({
  share_transcript: z.boolean().default(false),
}).strict();

export const VoiceCheckinSchema = z.object({
  user_id: z.string().uuid(),
  timestamp: z.string(), // ISO 8601 expected
  mh_local_features: VoiceFeaturesSchema.optional(),
  mood_vector: MoodVectorSchema.optional(),
  transcript_hash: z.string().optional(),
  consent_flags: ConsentFlagsSchema.optional(),
}).strict();

export type VoiceCheckin = z.infer<typeof VoiceCheckinSchema>;
