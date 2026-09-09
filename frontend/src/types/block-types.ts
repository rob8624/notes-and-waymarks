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

export interface DividerBlock {
   __component: 'blocks.divider'
  id: number
  style: 'Dashed' | 'Dotted' | 'Solid' | 'Rounded'
}

export interface YoutubeBlockType {
  __component: 'blocks.youtube'
  id: number
  url: string
}

export interface MultiImageBlockType {
  __component: 'blocks.multiple-images'
  id: number
  images : Array<IStrapiMedia>
}

export type DynamicZoneBlock = RichTextBlock | ImageBlock | DividerBlock | YoutubeBlockType | MultiImageBlockType