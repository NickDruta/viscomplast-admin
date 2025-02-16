import { z } from "zod";

export const languageSchema = z.object({
  en: z.string(),
  ru: z.string(),
  ro: z.string(),
});
export type LanguageSchema = z.infer<typeof languageSchema>;

export const languageArraySchema = z.object({
  en: z.array(z.string()),
  ru: z.array(z.string()),
  ro: z.array(z.string()),
});
