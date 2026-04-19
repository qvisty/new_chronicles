import { defineCollection, z } from 'astro:content';

const wiki = defineCollection({
  type: 'content',
  schema: z.object({
    // Valgfri typemarkering (person, sted, organisation, genstand, begivenhed, andet)
    type: z.enum(['person', 'place', 'organization', 'item', 'event', 'other']).optional(),
    // Fritekst-tags til kategorisering (accepter baade array og kommasepareret streng)
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    // Eksplicitte "Se ogsaa"-links: liste af sidenavne (filnavn uden .md)
    related: z.array(z.string()).optional(),
    // Udgivelsesdato (YYYY-MM-DD) — bruges til sortering af stories i udgivelsesraekkefoelge
    date: z.string().optional(),
    // Eksplicit sorteringstal — bruges som alternativ til date for stories
    order: z.number().optional(),
    // Tillad alle andre frontmatter-felter fra eksisterende filer
  }).passthrough().optional().default({}),
});

export const collections = { wiki };
