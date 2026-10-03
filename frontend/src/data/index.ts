import { getCategories, getFooterData, getHeaderData, getLinkData, getPostsData, getSiteSettings, } from "./server-functions"

export const strapiAPI = {
    header : {
        getHeaderData
    },
    
    footer :  {
        getFooterData
    },

    siteSettings : { 

        getSiteSettings
    }, 
    
    posts:
    {
        getPostsData
    },

    links: {
        getLinkData,
        getCategories
    }
}