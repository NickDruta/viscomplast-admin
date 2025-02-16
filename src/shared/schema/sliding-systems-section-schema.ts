import { z } from "zod";
import { languageSchema } from "./language-schema";

export const galleryCardSchema = z.object({
  title: languageSchema,
  description: languageSchema,
  gallery: z.array(z.string()),
});
export type GalleryCardType = z.infer<typeof galleryCardSchema>;

export const slidingSystemsSectionSchema = z.object({
  title: languageSchema,
  description: languageSchema,
  typeGalleryCards: z.array(galleryCardSchema),
});
export type SlidingSystemsSectionType = z.infer<
  typeof slidingSystemsSectionSchema
>;
