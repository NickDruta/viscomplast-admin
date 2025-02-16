import { z } from "zod";
import { languageArraySchema, languageSchema } from "./language-schema";

export const profileSchema = z.object({
  id: z.number(),
  seq: z.number(),
  title: languageSchema,
  description: languageSchema,
  characteristics: languageArraySchema,
  image: z.string(),
});
export type ProfileType = z.infer<typeof profileSchema>;

export const profilesSectionSchema = z.object({
  id: z.number(),
  sectionTitle: languageSchema,
  profiles: z.array(profileSchema),
});
export type ProfilesSectionType = z.infer<typeof profilesSectionSchema>;
