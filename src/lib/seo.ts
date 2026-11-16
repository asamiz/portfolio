import { getImage } from 'astro:assets';
import avatar from '../assets/image.jpg';
import { profile, profileLinks } from '../data/profile';

/** Full URL of a square crop of the avatar, used for link previews and structured data. */
export async function avatarImageUrl(site: URL): Promise<string> {
  // Keep the top of the image so the head stays in frame.
  const image = await getImage({
    src: avatar,
    width: 600,
    height: 600,
    fit: 'cover',
    position: 'top',
    format: 'jpg',
  });
  return new URL(image.src, site).href;
}

/** schema.org Person for the site owner. Tells Google who writes this site. */
export async function person(site: URL) {
  return {
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: site.href,
    image: await avatarImageUrl(site),
    sameAs: profileLinks,
  };
}
