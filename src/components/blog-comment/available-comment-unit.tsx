/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

type AvailableCommentUnitProps = {
  comments: CommentType[]
  order: unknown
  reply: (arg1: string, arg2: string) => void
  // FIXME: Defune sortComments type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortComments: any
}

const AvailableCommentUnit = ({
  comments,
  order,
  reply,
  sortComments,
}: AvailableCommentUnitProps) => {
  const order1 = order === true ? 'Oldest First' : 'Most Recent'

  return (
    <>
      <div className="flex flex-column">
        {comments && <span className="mr-2">{comments.length} Comments</span>}
        <button className="ml-2" onClick={sortComments}>
          {order1}
        </button>
      </div>
      {comments &&
        comments.map((comment) => (
          <div className={''} key={`comment-id: ${comment.id}`}>
            <div className="text-left">
              <div className="justify-between">
                <span className="text-left text-sm">
                  <a className="text-sm" href={comment.handle}>
                    {comment.name}
                  </a>
                </span>
                {/* <span className={''}>{comment.timestamp}</span> */}
              </div>
              <p className="text-sm">{comment.message}</p>
              <button
                className="text-left"
                onClick={() => reply(comment.id, comment.name)}
              >
                Reply
              </button>
            </div>
            <div className="ml-4 text-left">
              {comment.replies.map((reply) => (
                <div className={''} key={`reply.id: ${reply.id}`}>
                  <div className="justify-between">
                    <span className="text-left">
                      <a className="text-sm" href={reply.handle}>
                        {reply.name}
                      </a>
                    </span>
                    {/* <span className={''}>{comment.timestamp}</span> */}
                  </div>
                  <p className="text-left text-sm">{reply.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  )
}

export default AvailableCommentUnit
