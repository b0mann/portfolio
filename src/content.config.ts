import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories } from './site.config';

/**
 * Projects: one Markdown file per project in src/content/projects/.
 * The file name becomes the URL: pingwatch.md -> /projects/pingwatch/
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line, around ten words. Shown in the index and as the case-study lede. */
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.enum(categories),
    repoUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    /** Optional: one command that shows the project in use. Rendered in the preview pane. */
    usage: z.string().optional(),
    /** Marks placeholder entries. Remove the field (or set false) on real projects. */
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
