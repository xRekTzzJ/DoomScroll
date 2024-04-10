import { Link } from 'react-router-dom'

const ErrorPage = () => {
	return (
		<div className='error-page'>
			<span>There is no such page.</span>
			<span>404</span>
			<Link to={'/'}>
				Back to the main page <span>→</span>
			</Link>
		</div>
	)
}

export default ErrorPage
