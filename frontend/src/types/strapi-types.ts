

//STRAPI DATA TYPES


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
  menu: Array<IMenuItem>
  
  
}


interface IFooterData extends IStrapiBaseEntity {
  
  message: string
  
}




//API RESPONSE TYPES

export interface IHeaderResponse {
  data: IHeaderData
  meta: Record<string, never>
}


export interface IFooterResponse {
    data: IFooterData
    meta: Record<string, never>
}
