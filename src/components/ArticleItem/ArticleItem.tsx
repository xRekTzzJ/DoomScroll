import { format } from 'date-fns'
import { useState } from 'react'
import avatar from '../../img/avatar.png'
import Rate from '../Rate/Rate'
import classes from './article-item.module.scss'

type Props = {
	image?: string
	username: string
	title: string
	description: string
	favoritesCount: number
	favorited: boolean
	tagList: string[]
	createdAt: string
	slug: string
}

const ArticleItem = ({
	title,
	username,
	description,
	image,
	createdAt,
	favoritesCount,
}: Props) => {
	const [imageError, setImageError] = useState(false)

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
		<li className={classes['article-item']}>
			<div className={classes['article-item__header']}>
				<div className={classes['article-item__info-container']}>
					<h2 className={classes['article-item__title']}>{title}</h2>
				</div>
				<div className={classes['article-item__tag-container']}>
					<span>Tag1</span>
					<span>SomeTag</span>
				</div>
				<div className={classes['article-item__person-info']}>
					<span>{username}</span>
					<span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
					{renderImage()}
				</div>
			</div>
			<p>{description}</p>
			<Rate favoritesCount={favoritesCount} />
		</li>
	)
}
export default ArticleItem
