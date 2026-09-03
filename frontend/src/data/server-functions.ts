import { createServerFn } from '@tanstack/react-start'
import { sdk } from "./strapi-sdk"

import type { IHeaderResponse, IFooterResponse, ISiteSettingsResponse, IPostsResponse, ICategoriesResponse } from '#/types/strapi-types';



//HEADER DATA 

const getHeader = async () => {
   return sdk.single('header').find({populate: '*'}) as Promise<IHeaderResponse>;
}


export const getHeaderData = createServerFn({method:'GET'}).handler(async (): Promise<IHeaderResponse> => {
    const response = await getHeader()
    
    return response
})


//FOOTER DATA

const getFooter = async () => {
    return sdk.single('footer').find({populate: '*'}) as Promise<IFooterResponse>;
}

export const getFooterData = createServerFn({method: 'GET'}).handler(async ():Promise<IFooterResponse> => {
    const response = await getFooter()
    
    return response
})

//SITE_SETTINGS

const getSettings = async () => {
  return sdk.single('site-setting').find({
    populate: {
      momentImage: true,
      homePageBook: {
        populate: {
          image: true,
        },
      },
    },
  }) as Promise<ISiteSettingsResponse>
}



// NOTE: `as any` here is intentional, not a shortcut I forgot to fix.
// TanStack Start's createServerFn tries to statically verify the return
// type is JSON-serializable. @strapi/blocks-react-renderer's BlocksContent
// type (used in homePageMessage) has fields typed as Record<string, unknown>,
// which the checker can't prove is serializable — even though the actual
// runtime data from Strapi is plain JSON and totally fine.
// Real type safety is restored at the call site instead:
//   const siteSettings = (await getSiteSettings()) as ISiteSettingsResponse
export const getSiteSettings = createServerFn({method: 'GET'}).handler(async () => {
    const response = await getSettings()
    return response as any

})


//POSTS

//call that gets minimum data for post cards etc
const getPosts = async ({ page, category, order }: { page: number; category?: string; order: string }) => {
  return sdk.collection('posts').find({
    fields: ['title', 'slug', 'summary'],           
    populate: {
      featuredImage: { fields: ['url', 'formats', 'alternativeText'] },
      categories: { fields: ['name', 'slug'] },
      
     },
    pagination: { page, pageSize: 3 },
    sort: [`createdAt:${order}`],
    ...(category && {
      filters: {
        categories: { slug: { $eq: category } },
      },
    }),
  }) as Promise<IPostsResponse>
}

export const getPostsData = createServerFn({ method: 'GET' })
  .validator((data: { page: number; category?: string; order: string }) => data)
  .handler(async ({ data }) => {
    const response = await getPosts(data)
    return response as any
  })


//Post Detail

const getDetail = async ({ slug }: { slug: string }) => {
  return sdk.collection('posts').find({
    filters: {
      slug: { $eq: slug },
    },
    populate: {
      featuredImage: { fields: ['url', 'formats', 'alternativeText'] },
      categories: { fields: ['name', 'slug'] },
      author: { fields: ['name', 'position'] },
      content: {
        on: {
          'blocks.richtext': {
            fields: ['richtext'],
          },
          'blocks.image': {
            populate: {
              singleImage: {
              populate: {
              image: { fields: ['url', 'formats', 'alternativeText'] },
              settings : true,
              imageCaption: true
            },
            
            },
            },
          },
        },
      },
    },
  }) as Promise<IPostsResponse>
}

export const getPostDetail = createServerFn({method:'GET'})
.validator((data: {slug: string}) => data)
.handler(async ({ data }):Promise<IPostsResponse> => {
    const response = await getDetail(data)
    return response
} )


//CATEFORIES

const getAllCategories = async () => {
    return sdk.collection('categories').find({
        filters: {posts: { id: { $notNull: true } },}
    }) as Promise<ICategoriesResponse>
}

export const getAllCategoryData = createServerFn({method: 'GET'})

.handler(async ():Promise<ICategoriesResponse> => {
    const respose = await getAllCategories()
    return respose
})