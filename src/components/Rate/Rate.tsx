import like from '../../img/like.svg'
import classes from './rate.module.scss'
type Props = {
	favoritesCount: number
}

const Rate = ({ favoritesCount }: Props) => {
	return (
		<div
			className={classes['rate-container']}
			onClick={e => {
				e.stopPropagation()
			}}
		>
			<img src={like} alt='Like button.' />
			<span>{favoritesCount}</span>
		</div>
	)
}

export default Rate
