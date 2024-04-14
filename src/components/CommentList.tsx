import {
	DeleteOutlined,
	DownOutlined,
	LoadingOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import { Popconfirm, Spin } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../core/hooks/hooks'
import { deleteComment } from '../core/services/realworld-service'
import { createComment, getArticle } from '../core/store/actions'
import { IArticleState, IUserState } from '../core/types/types'
import classes from '../styles/comment-list.module.scss'
import UserImage from './UserImage'

const CommentList = ({ slug }: { slug: string }) => {
	const [commentState, setCommentState] = useState(false)
	const [loading, setLoading] = useState(false)
	const [sendingComment, setSendingComment] = useState(false)

	const { comments } = useSelector((state: IArticleState) => state.article)
	const { token, username } = useSelector((state: IUserState) => state.user)

	const dispatch = useAppDispatch()

	type Inputs = {
		body: string
	}

	const { register, handleSubmit, reset } = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit = async (inputs: Inputs) => {
		if (inputs.body.trim().length) {
			setSendingComment(true)
			try {
				await dispatch(
					createComment(slug, token ? token : '', inputs.body.trim())
				)
			} catch {
				toast.error('Something went wrong!')
			} finally {
				setSendingComment(false)
			}
		}
		reset()
	}

	const CommentsContainer = () => {
		return (
			<ul>
				{comments.map(i => (
					<li key={i.id}>
						{i.author.username === username && !loading && (
							<Popconfirm
								title='Delete the comment'
								description='Are you sure to delete this comment?'
								okText='Yes'
								cancelText='No'
								placement='topLeft'
								onConfirm={async () => {
									setLoading(true)
									try {
										deleteComment(i.id, token ? token : '', slug)
										await dispatch(getArticle(slug, token))
									} catch {
										toast.error('Something went wrong!')
									} finally {
										setLoading(false)
									}
								}}
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
						{i.author.username === username && loading && (
							<div className={classes['comment-list__delete-button']}>
								<Spin
									style={{
										display: 'block',
										margin: '0 auto',
									}}
									indicator={
										<LoadingOutlined
											style={{
												fontSize: 24,
												color: 'white',
											}}
											spin
										/>
									}
								/>
							</div>
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
				{sendingComment ? (
					<Spin
						style={{
							display: 'block',
							margin: '0 auto',
						}}
						indicator={
							<LoadingOutlined
								style={{
									fontSize: 24,
									color: 'white',
								}}
								spin
							/>
						}
					/>
				) : (
					<button
						disabled={Boolean(!token)}
						style={{ opacity: token ? '1' : '0.4', cursor: 'default' }}
					>
						Send
					</button>
				)}
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
