import { Link } from 'react-router-dom'

const SignButtons: React.FC = () => {
	return (
		<div className='header__button-container'>
			<Link to={'/sign-in'}>Sign In</Link>
			<Link to='/sign-up'>Sign Up</Link>
		</div>
	)
}
export default SignButtons
