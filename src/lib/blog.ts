/** Blog queries that need Astro's content runtime. Filtering rules live in lib/content.ts. */
import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { publishedPosts } from './content';

export async function getPublishedPosts(lang: Lang) {
  return publishedPosts(await getCollection('blog'), lang);
}

export async function hasPublishedPosts(lang: Lang): Promise<boolean> {
  return (await getPublishedPosts(lang)).length > 0;
}
