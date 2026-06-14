import { useEffect } from "react";

export const SITE_URL = "https://skylineconsultancyengineering.com";
const SITE_NAME = "Skyline Consultancy & Engineering";
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/e6415b3c-d84e-4730-85db-6ff2ff190be3.png`;

interface SEOProps {
  /** Page title (without the brand suffix, which is appended automatically) */
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used to build the canonical URL. */
  path: string;
  image?: string;
  /** When true, instruct crawlers not to index the page (e.g. admin). */
  noindex?: boolean;
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Manages per-page SEO metadata for this client-rendered SPA: document title,
 * meta description, canonical URL, robots directive, and Open Graph / Twitter tags.
 */
const SEO = ({ title, description, path, image, noindex = false }: SEOProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image, noindex]);

  return null;
};

export default SEO;
