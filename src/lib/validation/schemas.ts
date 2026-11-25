import { z } from "zod";

const httpsUrl = z.url({ protocol: /^https$/ });

export const lyricsLineSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    text: z.string().min(1),
    startTime: z.number().nonnegative().optional(),
    endTime: z.number().positive().optional(),
  })
  .refine((l) => l.endTime === undefined || (l.startTime !== undefined && l.endTime > l.startTime), {
    message: "endTime requires a smaller startTime",
  });

export const languageLyricsSchema = z.object({
  languageName: z.string(),
  translationStatus: z.enum(["draft", "review", "approved", "published"]),
  translationSource: z.string().optional(),
  sections: z.array(
    z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      sectionType: z.string(),
      heading: z.string(),
      lines: z.array(lyricsLineSchema).min(1),
    }),
  ),
});

export const multilingualLyricsSchema = z.object({
  songId: z.string(),
  sourceLanguage: z.literal("vi"),
  publicationStatus: z.enum(["draft", "pending_rights", "published", "unpublished"]),
  rightsConfirmed: z.boolean(),
  allowCopy: z.boolean(),
  languages: z.object({ vi: languageLyricsSchema, en: languageLyricsSchema, "zh-CN": languageLyricsSchema }),
});

export const snapshotSchema = z.object({
  recordedAt: z.iso.datetime({ offset: true }),
  value: z.number().int().nonnegative(),
  source: z.string().optional(),
});

export const fansiteSchema = z.object({
  id: z.string(),
  order: z.number().int(),
  name: z.string().min(1),
  tagline: z.string(),
  description: z.string(),
  logo: z.string().startsWith("/").nullable(),
  threadsUrl: httpsUrl.nullable(),
  qrImage: z.string().startsWith("/images/fansites/").nullable(),
  qrAlt: z.string(),
  messengerInviteUrl: httpsUrl.nullable(),
});

/** Threads API post (subset we use). Validates untrusted API input before storing. */
export const threadsPostSchema = z.object({
  id: z.string(),
  text: z.string().optional().default(""),
  username: z.string(),
  permalink: httpsUrl,
  timestamp: z.string(),
  media_type: z.string(),
  media_url: httpsUrl.optional(),
});

export const serverEnvSchema = z.object({
  SUPABASE_URL: httpsUrl,
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  THREADS_ACCESS_TOKEN: z.string().min(10),
  THREADS_USER_ID: z.string().min(1),
});
