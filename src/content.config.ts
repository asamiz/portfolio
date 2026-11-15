import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  // Files starting with "_" (like _template.md) are ignored.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // One-line summary, used for search engines, link previews and RSS.
    description: z.string(),
    date: z.coerce.date(),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url() }))
      .default([]),
    // Drafts show in `npm run dev` but are left out of the live site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
