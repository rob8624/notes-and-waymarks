import type { YoutubeBlockType } from "#/types/block-types"

interface YouTubeBlockProps {
    url: YoutubeBlockType['url']
}



function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
    }

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      const videoId =
        parsed.searchParams.get("v") ??
        parsed.pathname.split("/")[2]

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    return null
  } catch {
    return null
  }
}

export function YoutubeBlock({ url }: YouTubeBlockProps) {
  const embedUrl = getYouTubeEmbedUrl(url)

  if (!embedUrl) return null

  return (
    <iframe
    className="w-full aspect-video p-3"
      src={embedUrl}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}