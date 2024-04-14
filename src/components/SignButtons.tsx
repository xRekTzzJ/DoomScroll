import { Link } from 'react-router-dom'
import classes from '../styles/header.module.scss'

const SignButtons: React.FC = () => {
	return (
		<div className={classes['header__button-container']}>
			<Link to={'/sign-in'}>Sign In</Link>
			<Link to='/sign-up'>Sign Up</Link>
		</div>
	)
}
export default SignButtons
