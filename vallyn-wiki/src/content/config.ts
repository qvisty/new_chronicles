import { defineCollection, z } from 'astro:content';

const wiki = defineCollection({
  type: 'content',
  // Accept any frontmatter — the markdown files have varied/inconsistent frontmatter
  schema: z.record(z.unknown()).optional().default({}),
});

export const collections = { wiki };
