import {
  FacebookShareButton,
  XShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'



interface ShareButtonProps {
    title: string
    url: string
}



export function ShareButtons({ title, url }: ShareButtonProps) {
  return (
    <div className="flex items-center gap-3">
      <XShareButton url={url} title={title}>
        <XIcon size={32} round />
      </XShareButton>

      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  )
}