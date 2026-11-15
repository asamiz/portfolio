import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Published articles, newest week first. Drafts are included only in dev. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) =>
    import.meta.env.DEV ? true : !data.draft,
  );
  return all.sort((a, b) => b.data.week - a.data.week);
}

/** Rough reading time at 220 words per minute. */
export function readingTime(body = ''): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
