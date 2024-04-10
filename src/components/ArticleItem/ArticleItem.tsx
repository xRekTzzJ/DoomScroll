import avatar from '../../img/avatar.png'
import Rate from '../Rate/Rate'
import classes from './article-item.module.scss'

const ArticleItem: React.FC = () => {
	return (
		<li className={classes['article-item']}>
			<div className={classes['article-item__header']}>
				<div className={classes['article-item__info-container']}>
					<h2 className={classes['article-item__title']}>
						Some article title.
					</h2>
				</div>
				<div className={classes['article-item__tag-container']}>
					<span>Tag1</span>
					<span>SomeTag</span>
				</div>
				<div className={classes['article-item__person-info']}>
					<span>Username</span>
					<span>March 5, 2020</span>
					<img src={avatar} alt='Avatar.' />
				</div>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias
				labore sit. Blanditiis doloribus deserunt, esse, qui id, recusandae cum
				nam et nisi laboriosam soluta consequatur perferendis! Quisquam,
				assumenda cupiditate.
			</p>
			<Rate />
		</li>
	)
}
export default ArticleItem
