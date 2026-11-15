import rss from '@astrojs/rss';
import { getArticles } from '../lib/articles';

export async function GET(context) {
  const articles = (await getArticles()).filter((a) => !a.data.draft);
  return rss({
    title: 'Ahmed Sami — Articles',
    description: "Every week I study a topic I don't know yet and write what I learned.",
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: `/articles/${a.id}/`,
    })),
  });
}
