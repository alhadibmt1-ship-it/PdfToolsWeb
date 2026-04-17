import type { BlogTranslation } from "./types";

export type { BlogTranslation };

const loaders: Record<string, () => Promise<{ translations: Record<string, BlogTranslation> }>> = {
  es: () => import("./es"),
  fr: () => import("./fr"),
  de: () => import("./de"),
  pt: () => import("./pt"),
  it: () => import("./it"),
  zh: () => import("./zh"),
  ja: () => import("./ja"),
  ar: () => import("./ar"),
  hi: () => import("./hi"),
  ru: () => import("./ru"),
  id: () => import("./id"),
  ur: () => import("./ur"),
};

const cache: Record<string, Record<string, BlogTranslation>> = {};

export async function getBlogTranslation(
  lang: string,
  slug: string
): Promise<BlogTranslation | null> {
  if (lang === "en" || !loaders[lang]) return null;
  if (!cache[lang]) {
    try {
      const mod = await loaders[lang]();
      cache[lang] = mod.translations;
    } catch {
      return null;
    }
  }
  return cache[lang][slug] ?? null;
}
