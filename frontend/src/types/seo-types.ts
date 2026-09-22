
import type { IStrapiMedia } from "./strapi-types"

export interface seoType {
    metaTitle: string
    metaDescription: string
    shareImage: IStrapiMedia
    keywords: string
    canonicalUrl: string
    noIndex: boolean
}