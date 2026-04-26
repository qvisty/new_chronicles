import { defineCollection, z } from 'astro:content';

const wiki = defineCollection({
  type: 'content',
  schema: z.object({
    // Optional type tag (person, place, organization, item, event, other)
    type: z.enum(['person', 'place', 'organization', 'item', 'event', 'other']).optional(),
    // Free-text tags for categorization (accepts both array and comma-separated string)
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    // Explicit "See also" links: list of page names (filename without .md)
    related: z.array(z.string()).optional(),
    // Publication date (YYYY-MM-DD) — used for sorting stories in publication order
    date: z.string().optional(),
    // Explicit sort order number — used as alternative to date for stories
    order: z.number().optional(),
    // Allow all other frontmatter fields from existing files
  }).passthrough().optional().default({}),
});

export const collections = { wiki };
