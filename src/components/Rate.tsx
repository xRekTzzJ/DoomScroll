import like from '../assets/img/like.svg'
import { RateProps } from '../core/types/types'
import classes from '../styles/rate.module.scss'

const Rate = ({ favoritesCount }: RateProps) => {
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
