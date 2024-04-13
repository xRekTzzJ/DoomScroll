import { Link } from 'react-router-dom'
import UserImage from './UserImage'

const HeaderProfile = ({
	username,
	image,
	logOutHandler,
}: {
	username: string
	image: string | undefined
	logOutHandler: (arg: boolean) => void
}) => {
	return (
		<div className='header__profile-container'>
			<Link to='/new-article'>Create article</Link>
			<Link className='header__profile' to='/profile'>
				<div>
					<span>{username}</span>
					<UserImage image={image} />
				</div>
			</Link>

			<button onClick={() => logOutHandler(true)}>Log Out</button>
		</div>
	)
}

export default HeaderProfile
