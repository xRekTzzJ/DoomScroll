import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ArticleItemProps } from '../core/types/types'
import classes from '../styles/article-item.module.scss'
import Rate from './Rate'
import UserImage from './UserImage'

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
	const navigate = useNavigate()

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
					<UserImage image={image} />
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
