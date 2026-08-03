import { getFooterData, getHeaderData, getPostsData, getSiteSettings } from "./server-functions"

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
    }
}