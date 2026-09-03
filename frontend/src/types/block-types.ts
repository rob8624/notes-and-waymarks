import type { IStrapiMedia, IStrapiBaseEntity, IImageSettings, IImageCaption } from './strapi-types'

export interface RichTextBlock extends IStrapiBaseEntity {
  __component: 'blocks.richtext'
  id: number
  richtext: string
}

export interface ImageBlock extends IStrapiBaseEntity {
  __component: 'blocks.image'
  id: number
  singleImage: {
    id: number
    image: IStrapiMedia
    settings: IImageSettings
    imageCaption : IImageCaption | null
  }
}

export type DynamicZoneBlock = RichTextBlock | ImageBlock