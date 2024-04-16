import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Popconfirm, Spin } from 'antd'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../core/hooks/hooks'
import { deleteArticle } from '../core/services/realworld-service'
import { getArticle } from '../core/store/actions'
import { IArticleState, IUserState } from '../core/types/types'
import classes from '../styles/article.module.scss'
import CommentList from './CommentList'
import Rate from './Rate'
import UserImage from './UserImage'

const Article = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const { slug } = useParams()

	const {
		title,
		description,
		tagList,
		body,
		createdAt,
		author,
		favorited,
		favoritesCount,
	} = useSelector((state: IArticleState) => state.article)
	const { username, token } = useSelector((state: IUserState) => state.user)

	const loadArticle = async (slug = '') => {
		try {
			await dispatch(getArticle(slug, token))
		} catch {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadArticle(slug)
	}, [])

	if (loading) {
		return (
			<section className={classes['article']}>
				<Spin
					style={{
						display: 'block',
						margin: '0 auto',
					}}
					indicator={
						<LoadingOutlined
							style={{
								fontSize: 48,
							}}
							spin
						/>
					}
				/>
			</section>
		)
	}

	if (error) {
		return (
			<section className={classes['article']}>
				<div className={classes['article__header']}>
					<h2 className={classes['article__title']}>Error 404.</h2>
					<div className={classes['article__person-info']}>
						<span></span>
						<span></span>
						<span>username</span>
						<UserImage image='' />
					</div>
				</div>
				<p className={classes['article__description']} style={{ color: 'red' }}>
					Article not found.
				</p>
				<div className={classes['article__markdown']}></div>
			</section>
		)
	}

	const confirm = async () => {
		try {
			await deleteArticle(slug, token)
			navigate('/')
			toast.success('You have successfully delete an article!')
		} catch {
			toast.error('Something went wrong!')
		}
	}

	return (
		<section className={classes['article']}>
			{username === author.username && (
				<div className={classes['article__author-buttons']}>
					<Popconfirm
						title='Delete the task'
						description='Are you sure to delete this article?'
						okText='Yes'
						cancelText='No'
						onConfirm={confirm}
						icon={
							<QuestionCircleOutlined
								style={{
									color: 'red',
								}}
							/>
						}
					>
						<button
							style={{
								color: '#F5222D',
							}}
						>
							Delete
						</button>
					</Popconfirm>
					<button
						style={{
							color: '#52c41a',
						}}
						onClick={() => {
							navigate('edit', {
								state: { slug },
							})
						}}
					>
						Edit
					</button>
				</div>
			)}
			<div className={classes['article__header']}>
				<h2
					className={classes['article__title']}
					style={{
						opacity: title ? '1' : '0.5',
					}}
				>
					{title ? title : 'The user has not added a title yet.'}
				</h2>
				<ul className={classes['article__tag-container']}>
					{tagList.map((i: string, index: number) => {
						if (index < 10 && i !== null && i.length) {
							return <li key={index}>{i}</li>
						}
					})}
				</ul>
				<div
					className={classes['article__person-info']}
					onClick={e => {
						e.stopPropagation()
						navigate(`/profile/${author.username}`)
					}}
				>
					<span>{author.username}</span>
					<span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
					<UserImage image={author.image} />
				</div>
			</div>
			<div className={classes['article__description-container']}>
				<p
					className={classes['article__description']}
					style={{
						opacity: description ? '1' : '0.5',
					}}
				>
					{description
						? description
						: 'The user has not added a description yet.'}
				</p>
				<Rate
					favoritesCount={favoritesCount}
					favorited={favorited}
					slug={slug ? slug : ''}
				/>
			</div>

			<div className={classes['article__markdown']}>
				<Markdown>{body}</Markdown>
			</div>
			<CommentList slug={slug ? slug : ''} />
		</section>
	)
}

export default Article
