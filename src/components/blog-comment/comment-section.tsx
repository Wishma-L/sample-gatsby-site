/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createNewComment } from '../../utils/article-comment-api'
import React, { useState, useEffect } from 'react'
import AvailableCommentUnit from './available-comment-unit'
import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useKeycloak } from '@react-keycloak/web'

type CommentSectionProps = {
  availableComments: CommentType[]
  entryId: string
  changeNewCommentState?: () => void
}

type Inputs = {
  name: string
  message: string
  handle: string
  // commentId: string
  // replies: [{}]
  // replyId: string
  // replyName: string
  // replyMessage: string
  // replyHandle: string
  // replyCommentId: string
  // replyTimeStamp: string
}

type UserInfo = {
  email: string
  preferred_username: string
}

const CommentSection = ({
  availableComments,
  entryId,
  changeNewCommentState,
}: CommentSectionProps) => {
  const { keycloak } = useKeycloak()
  const [userDetails, setUserDetails] = useState<UserInfo | null>(
    {} as UserInfo
  )
  useEffect(() => {
    keycloak
      .loadUserInfo()
      .then((userInfo) => setUserDetails({ ...userInfo } as UserInfo))
  }, [userDetails?.email])

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const replies: ReplyType[] = []
    const comment = {
      name: data.name,
      message: data.message,
      handle: data.handle,
      id: uuidv4(),
      replies: replies,
    }
    createNewComment(comment, entryId)
    reset()
    changeNewCommentState && changeNewCommentState()
  }

  // const [isReply, setIsReply] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState(false)

  // FIXME: Fix this any issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sortedComments, setSortComments] = useState<any>([])

  // const cancelReply = (evt: any) => {
  //   // evt.preventDefault()
  //   // setIsReply(false)
  //   // setReplyName('')
  //   // setReplyId(null)
  // }

  const sortComments = (comments: []) => {
    if (!sorting) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sorted = comments.sort((a: any, b: any) =>
        a.timestamp < b.timestamp ? -1 : 1
      )
      setSorting(true)
      setSortComments(sorted)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sorted = comments.sort((a: any, b: any) =>
        a.timestamp > b.timestamp ? -1 : 1
      )
      setSorting(false)
      setSortComments(sorted)
    }
  }

  console.log('sortComments: ', sortedComments)

  const reply = (id: string, name: string) => {
    // window.scrollTo(50, document.body.scrollHeight)
    // this.setState({
    //   reply: true,
    //   replyName: `Replying to ${name} `,
    //   replyID: id
    // })
    console.log(id, ' ', name)
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-8">
        <AvailableCommentUnit
          comments={availableComments}
          order={undefined}
          reply={reply}
          sortComments={sortComments}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name:
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="name"
                defaultValue={userDetails?.preferred_username}
                {...register('name')}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Handle:
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id="handle"
                defaultValue={userDetails?.email}
                {...register('handle')}
                placeholder="Will be linked in your name (optional)"
                required
              />
            </div>
          </div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Your message
          </label>
          <textarea
            id="message"
            cols={30}
            rows={10}
            {...register('message')}
            required
            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <input
            className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
            onClick={() => {
              // FIXME: Build the function here
              setLoading(true)
            }}
            value={loading ? 'Adding...' : 'Add Comment'}
          />
        </form>
      </div>
    </div>
  )
}

export default CommentSection
