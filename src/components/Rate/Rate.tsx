import like from '../../img/like.svg'
import classes from './rate.module.scss'

const Rate = () => {
	return (
		<div
			className={classes['rate-container']}
			onClick={e => {
				e.stopPropagation()
			}}
		>
			<img src={like} alt='Like button.' />
			<span>12</span>
		</div>
	)
}

export default Rate
