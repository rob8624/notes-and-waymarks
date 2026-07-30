import { strapi } from '@strapi/client'
import { getStrapiURL } from '@/lib/utils'

/**
 * Base URL for the Strapi API.
 * Combines the Strapi base URL with the /api prefix.
 * e.g. http://localhost:1337/api
 */

/**
 * Strapi SDK client instance.
 * Use this to interact with the Strapi API throughout the app.
 * 
 * @example
 * import { sdk } from '@/lib/strapi'
 * const data = await sdk.single('homepage').find({ populate: '*' })
 */


const BASE_API_URL = getStrapiURL() + "/api";
const sdk = strapi({ baseURL: BASE_API_URL })

export { sdk }