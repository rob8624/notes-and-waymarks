import type { IPostData } from "#/types/strapi-types"





export function PostCard({title, slug, categories, summary, featuredImage}: IPostData) {
    return (
        <div>
        <div>{title}</div>
        <div>{summary}</div>
        <div>{categories.map(item => item.name)}</div>
    </div>
)
}