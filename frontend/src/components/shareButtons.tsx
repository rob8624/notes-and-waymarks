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
    <div className="flex items-center sm:gap-3">
      <div className="scale-75 sm:scale-100">
        <XShareButton url={url} title={title}>
          <XIcon size={32} round />
        </XShareButton>
      </div>

      <div className="scale-75 sm:scale-100">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className="scale-75 sm:scale-100">
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div className="scale-75 sm:scale-100">
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}