import { z } from "zod";
import { languageSchema } from "./language-schema";

export const sponsorSectionSchema = z.object({
  title: languageSchema,
  description: languageSchema,
});
export type SponsorSectionType = z.infer<typeof sponsorSectionSchema>;
