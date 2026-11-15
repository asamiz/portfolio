import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Published articles, newest first. Drafts are included only in dev. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) =>
    import.meta.env.DEV ? true : !data.draft,
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Articles grouped by year, newest year first. */
export function groupByYear(articles: Article[]): { year: number; items: Article[] }[] {
  const groups = new Map<number, Article[]>();
  for (const a of articles) {
    const year = a.data.date.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), a]);
  }
  return [...groups].map(([year, items]) => ({ year, items }));
}

/** Rough reading time at 220 words per minute. */
export function readingTime(body = ''): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** "Nov 09, 2026" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

/** "Nov 09" */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
}
