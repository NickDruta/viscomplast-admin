import { z } from "zod";
import { languageSchema } from "./language-schema";

export const handleSchema = z.object({
  id: z.number(),
  name: languageSchema,
  src: z.string(),
});
export type HandleType = z.infer<typeof handleSchema>;

export const handlesSectionSchema = z.object({
  title: languageSchema,
  types: z.array(handleSchema),
});
export type HandlesSectionType = z.infer<typeof handlesSectionSchema>;
