import { Link } from 'react-router-dom'
import classes from '../styles/error-page.module.scss'

const ErrorPage = () => {
	return (
		<div className={classes['error-page']}>
			<span>There is no such page.</span>
			<span>404</span>
			<Link to={'/'}>
				Back to the main page <span>→</span>
			</Link>
		</div>
	)
}

export default ErrorPage
