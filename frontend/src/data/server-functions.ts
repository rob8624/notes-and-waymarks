import { createServerFn } from '@tanstack/react-start'
import { sdk } from "./strapi-sdk"

import type { IHeaderResponse, IFooterResponse, ISiteSettingsResponse, IPostsResponse } from '#/types/strapi-types';



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
    return sdk.single('site-setting').find({populate: '*'}) as Promise<ISiteSettingsResponse>;
}

export const getSiteSettings = createServerFn({method: 'GET'}).handler(async ():Promise<ISiteSettingsResponse> => {
    const response = await getSettings()
    return response

})


//POSTS

const getPosts = async () => {
    return sdk.collection('posts').find({populate: '*', pagination: {pageSize:5 }}) as Promise<IPostsResponse>
}

export const getPostsData = createServerFn({method: 'GET'}).handler(async ():Promise<IPostsResponse> => {
    const respose = await getPosts()
    return respose
} )