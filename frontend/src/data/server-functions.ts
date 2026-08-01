import { createServerFn } from '@tanstack/react-start'
import { sdk } from "./strapi-sdk"

import type { IHeaderResponse, IFooterResponse } from '#/types/strapi-types';



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
    console.log('FOOTER RESPONSE DATA', response)
    return response
})