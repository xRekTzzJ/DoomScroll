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
import { createComment } from '../core/store/actions'
import { IArticleState, IUserState } from '../core/types/types'
import classes from '../styles/comment-list.module.scss'
import UserImage from './UserImage'

const CommentList = ({ slug }: { slug: string }) => {
	const [commentState, setCommentState] = useState(false)

	const { comments } = useSelector((state: IArticleState) => state.article)
	const { token } = useSelector((state: IUserState) => state.user)

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

	const CommentsContainer = () => {
		return (
			<ul>
				{comments.map(i => (
					<li key={i.id}>
						<Popconfirm
							title='Delete the task'
							description='Are you sure to delete this comment?'
							okText='Yes'
							cancelText='No'
							placement='topLeft'
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder='Write a comment.'
					{...register('body', {
						required: true,
					})}
				/>
				<button>Send</button>
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
