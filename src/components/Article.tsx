import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Popconfirm, Spin } from 'antd'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import avatar from '../assets/img/avatar.png'
import { useAppDispatch } from '../hooks/hooks'
import { getArticle, IUserData } from '../store/actions'
import classes from '../styles/article.module.scss'
import { IArticle } from './ArticleList'
import Rate from './Rate'

const Article = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
	const { slug } = useParams()
	const [imageError, setImageError] = useState(false)
	interface RootState {
		article: IArticle
	}

	interface IUser {
		user: IUserData
	}

	const {
		title,
		description,
		tagList,
		body,
		createdAt,
		author,
		favorited,
		favoritesCount,
	} = useSelector((state: RootState) => state.article)

	const userName = useSelector((state: IUser) => state.user.username)

	const loadArticle = async (slug = '') => {
		await dispatch(getArticle(slug, ''))
		setLoading(false)
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
								color: '#52c41a',
								fontSize: 48,
							}}
							spin
						/>
					}
				/>
			</section>
		)
	}

	const renderImage = () => {
		if (imageError) {
			return <img src={avatar} alt='Person avatar.' />
		}
		return (
			<img
				src={author.image}
				alt='Person avatar.'
				onError={() => setImageError(true)}
			/>
		)
	}

	return (
		<section className={classes['article']}>
			{userName === author.username && (
				<div className={classes['article__author-buttons']}>
					<Popconfirm
						title='Delete the task'
						description='Are you sure to delete this article?'
						okText='Yes'
						cancelText='No'
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
				<div className={classes['article__person-info']}>
					<span>{author.username}</span>
					<span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
					{renderImage()}
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
				<Rate favoritesCount={favoritesCount} />
			</div>

			<div className={classes['article__markdown']}>
				<Markdown>{body}</Markdown>
			</div>
		</section>
	)
}

export default Article
