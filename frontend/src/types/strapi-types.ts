// STRAPI DATA TYPES

interface IStrapiFocalPoint {
  x: number
  y: number
}

interface IStrapiMediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
  provider_metadata: {
    public_id: string
    resource_type: string
  }
}

interface IStrapiMediaFormats {
  large?: IStrapiMediaFormat
  medium?: IStrapiMediaFormat
  small?: IStrapiMediaFormat
  thumbnail?: IStrapiMediaFormat
}

interface IStrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: IStrapiFocalPoint | null
  width: number
  height: number
  formats: IStrapiMediaFormats | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: {
    public_id: string
    resource_type: string
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface IStrapiBaseEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface IMenuItem {
  id: number
  label: string
  url: string
}

interface IHeaderData extends IStrapiBaseEntity {
  heading: string
  logo: IStrapiMedia
  menu: IMenuItem[]
}

interface IFooterData extends IStrapiBaseEntity {
  message: string
}

interface ISiteSettingsData extends IStrapiBaseEntity {
  articleMessage: string
  momentImage: IStrapiMedia
}

interface ICategoriesData extends IStrapiBaseEntity {
  name: string
  slug: string
}

export interface IPostData extends IStrapiBaseEntity {
  title: string
  slug: string
  featuredImage: IStrapiMedia
  categories: ICategoriesData[]
  summary: string
}

// API RESPONSE TYPES

// Wrapper for Strapi "single type" responses (Header, Footer, Site Settings)
// data is a single object, meta is always empty
interface IStrapiSingleResponse<T> {
  data: T
  meta: Record<string, never>
}

// Pagination shape Strapi returns on every "collection type" response
interface IStrapiPaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

// Wrapper for Strapi "collection type" responses (Posts, Categories)
// data is an array, meta contains real pagination info
interface IStrapiCollectionResponse<T> {
  data: T[]
  meta: IStrapiPaginationMeta
}

export type IHeaderResponse = IStrapiSingleResponse<IHeaderData>
export type IFooterResponse = IStrapiSingleResponse<IFooterData>
export type ISiteSettingsResponse = IStrapiSingleResponse<ISiteSettingsData>

export type IPostsResponse = IStrapiCollectionResponse<IPostData>
export type ICategoriesResponse = IStrapiCollectionResponse<ICategoriesData>