import pkg from '../package.json';

/**
 * Everything personal lives here. Edit this file first.
 */
export const site = {
  /** Shown as the wordmark and in page titles. */
  name: 'b0mann',
  role: 'Linux server administrator',
  description:
    'Linux server administrator who builds software on the side. Selected projects, the stack, and what I am working on now.',
  /** TODO: replace with your real address. The contact links are mailto: links to it. */
  email: 'you@example.com',
  github: 'https://github.com/b0mann',
  repo: 'https://github.com/b0mann/portfolio',
  /** Pulled from package.json, so `npm version patch|minor` updates the footer. */
  version: `v${pkg.version}`,
} as const;

export const categories = ['systems', 'automation', 'web', 'tools'] as const;
export type Category = (typeof categories)[number];

export const categoryLabel: Record<Category, string> = {
  systems: 'Systems',
  automation: 'Automation',
  web: 'Web',
  tools: 'Tools',
};
