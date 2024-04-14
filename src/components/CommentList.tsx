import {
	DeleteOutlined,
	DownOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../core/hooks/hooks'
import { deleteComment } from '../core/services/realworld-service'
import { createComment } from '../core/store/actions'
import { IArticleState, IUserState } from '../core/types/types'
import classes from '../styles/comment-list.module.scss'
import UserImage from './UserImage'

const CommentList = ({ slug }: { slug: string }) => {
	const [commentState, setCommentState] = useState(false)

	const { comments } = useSelector((state: IArticleState) => state.article)
	const { token, username } = useSelector((state: IUserState) => state.user)

	const dispatch = useAppDispatch()

	type Inputs = {
		body: string
	}

	const { register, handleSubmit, reset } = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit = (inputs: Inputs) => {
		if (inputs.body.trim().length) {
			dispatch(createComment(slug, token ? token : '', inputs.body.trim()))
		}
		reset()
	}

	const confirmHandler = (id: string, token: string, slug: string) => {
		deleteComment(id, token ? token : '', slug)
	}

	const CommentsContainer = () => {
		return (
			<ul>
				{comments.map(i => (
					<li key={i.id}>
						{i.author.username === username && (
							<Popconfirm
								title='Delete the comment'
								description='Are you sure to delete this comment?'
								okText='Yes'
								cancelText='No'
								placement='topLeft'
								onConfirm={() =>
									confirmHandler(i.id, token ? token : '', slug ? slug : '')
								}
								icon={
									<QuestionCircleOutlined
										style={{
											color: 'red',
										}}
									/>
								}
							>
								<DeleteOutlined
									className={classes['comment-list__delete-button']}
								/>
							</Popconfirm>
						)}
						<p className={classes['comment-list__body']}>{i.body}</p>
						<div className={classes['comment-list__person-info']}>
							<span>{i.author.username}</span>
							<span>{format(new Date(i.createdAt), 'MMMM dd, yyyy')}</span>
							<UserImage image={i.author.image} />
						</div>
					</li>
				))}
			</ul>
		)
	}

	const CommentForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)} style={{}}>
				<input
					placeholder='Write a comment.'
					{...register('body', {
						required: true,
						disabled: Boolean(!token),
					})}
				/>
				<button
					disabled={Boolean(!token)}
					style={{ opacity: token ? '1' : '0.4', cursor: 'default' }}
				>
					Send
				</button>
			</form>
		)
	}

	return (
		<div className={classes['comment-list']}>
			<button
				className={classes['comment-list__button']}
				onClick={() => setCommentState(state => !state)}
			>
				Comments ({comments.length})
				<DownOutlined
					style={{
						transition: '0.2s',
						transform: commentState ? 'rotate(180deg)' : '',
					}}
				/>
			</button>
			{commentState && <CommentForm />}
			{commentState && <CommentsContainer />}
			{!comments.length && commentState && (
				<span className={classes['comment-list__no-comments']}>
					There are no comments.
				</span>
			)}
		</div>
	)
}

export default CommentList
