# ahmedsami.me

Personal site built with [Astro](https://astro.build): a homepage with experience and contact links, plus a weekly articles section.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321 (drafts are visible here)
npm run build    # outputs the static site to dist/
```

## Add a weekly article

1. Copy `src/content/articles/_template.md` to `src/content/articles/short-topic.md` (the file name becomes the URL).
2. Fill in `title`, `description`, `date` and `sources`.
3. Write the article. Keep `draft: true` while you work; drafts show in `npm run dev` only.
4. Set `draft: false`, commit and push. Cloudflare rebuilds the site.

## Cloudflare settings

- Build command: `npm run build`
- Output directory: `dist`
- Node version comes from `.node-version`.

## Where things live

- `src/data/profile.ts` — homepage content: name, title, tagline, contact links
- `src/styles/global.css` — colors, fonts and shared styles from the design
- `public/cv.pdf` — your CV (add it so "Download CV" works)
- `src/pages/index.astro` — homepage
- `src/pages/articles/` — articles list and article pages
- `src/content/articles/` — the Markdown articles
- `src/assets/image.jpg` — the avatar
- `src/layouts/Base.astro` — shared `<head>` and page wrapper
