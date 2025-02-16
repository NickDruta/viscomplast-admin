import { z } from "zod";
import { languageSchema } from "./language-schema";

export const hardwareSectionSchema = z.object({
  title: languageSchema,
  description: languageSchema,
});
export type HardwareSectionType = z.infer<typeof hardwareSectionSchema>;
