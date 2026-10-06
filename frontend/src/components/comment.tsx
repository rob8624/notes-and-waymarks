import { useState } from 'react'
import type { IComment } from '#/types/strapi-types'
import { CommentsForm } from './commentsForm'

interface CommentsProps {
  submitted: Array<IComment>
  enabled: boolean
  postId: number
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export function Comments({ submitted, enabled, postId }: CommentsProps) {
   const [showForm, setShowForm] = useState(false)

  if (!enabled) {
    return <div className="text-center mt-10">Comments are disabled for this post</div>
  }

  return (
    <section className="border-t-4">
      <h3 className="font-bold font-cabin text-4xl mb-10 w-fit mx-auto mt-10">
        Comments
      </h3>

      {showForm && 
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={() => setShowForm(!showForm)}>
        <div className='p-10 bg-white ' onClick={(e) => e.stopPropagation()}>
            <CommentsForm post={postId} /></div>
        </div>
      }

      <button
        type="button"
        className="block mx-auto mb-6 underline" onClick={() => {setShowForm(!showForm)}}
      >
        Post a comment
      </button>
    
      <div className=" rounded-sm border p-2 md:p-2 w-[90%] md:w-[70%] mx-auto">
        {submitted.length === 0 ? (
          <p className="text-center">No comments yet. Be the first!</p>
        ) : (
          <ul className="flex flex-col bg-primary text-on-primary p-5 rounded-l-2xl shadow">
            {submitted.filter(item => item.visible).map((item) => (
             
              <li
                key={item.documentId}
                className="flex flex-col gap-3 py-5 border-b border-on-primary/30 first:pt-0 last:pb-0 last:border-b-0"
              >
                
                
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  <div>
                    From: <span className="font-bold pl-1">{item.author}</span>
                  </div>
                  <div>
                    Date:{' '}
                    <span className="font-bold pl-1">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div> 

                <p className="text-base">
                  &ldquo;{item.content}&rdquo;
                </p> 
              </li> 
             
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}