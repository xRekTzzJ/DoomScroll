import { DownOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { IArticleState } from '../core/types/types'
import classes from '../styles/comment-list.module.scss'
import UserImage from './UserImage'

const CommentList = ({ slug }: { slug: string }) => {
	const [commentState, setCommentState] = useState(false)

	const { comments } = useSelector((state: IArticleState) => state.article)

	type Inputs = {
		body: string
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setFocus,
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit = (inputs: Inputs) => {
		if (inputs.body.trim().length) {
			console.log(inputs.body.trim())
		}
		reset()
	}

	const CommentsContainer = () => {
		return (
			<ul>
				{comments.map(i => (
					<li key={i.id}>
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
