/**
 * Returns the Strapi base URL.
 * Reads from VITE_STRAPI_URL environment variable.
 * Falls back to http://localhost:1337 for local development.
 */
export function getStrapiURL() : string {
  return import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
}