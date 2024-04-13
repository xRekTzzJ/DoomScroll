import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/img/avatar.png'
import { ArticleItemProps } from '../core/types/types'
import classes from '../styles/article-item.module.scss'
import Rate from './Rate'

const ArticleItem = ({
	title,
	username,
	description,
	image,
	createdAt,
	favoritesCount,
	tagList,
	slug,
}: ArticleItemProps) => {
	const [imageError, setImageError] = useState(false)
	const navigate = useNavigate()
	const renderImage = () => {
		if (imageError) {
			return <img src={avatar} alt='Person avatar.' />
		}
		return (
			<img
				src={image}
				alt='Person avatar.'
				onError={() => setImageError(true)}
			/>
		)
	}

	return (
		<li className={classes['article-item']} onClick={() => navigate(slug)}>
			<div className={classes['article-item__header']}>
				<div className={classes['article-item__info-container']}>
					<h2
						className={classes['article-item__title']}
						style={{
							opacity: title ? '1' : '0.5',
						}}
					>
						{title ? title : 'The user has not added a title yet.'}
					</h2>
				</div>
				<div className={classes['article-item__tag-container']}>
					{tagList.map((i: string, index: number) => {
						if (index < 10 && i !== null && i.length) {
							return <span key={index}>{i}</span>
						}
					})}
				</div>
				<div className={classes['article-item__person-info']}>
					<span>{username}</span>
					<span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
					{renderImage()}
				</div>
			</div>
			<p
				style={{
					opacity: description ? '1' : '0.3',
				}}
			>
				{description
					? description
					: 'The user has not added a description yet.'}
			</p>
			<Rate favoritesCount={favoritesCount} />
		</li>
	)
}
export default ArticleItem
