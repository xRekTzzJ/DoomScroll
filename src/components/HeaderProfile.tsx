import { FC } from 'react'
import { Link } from 'react-router-dom'
import classes from '../styles/header.module.scss'
import UserImage from './UserImage'

const HeaderProfile: FC<{
	username: string
	image: string | undefined
	logOutHandler: (arg: boolean) => void
}> = ({ username, image, logOutHandler }) => {
	return (
		<div className={classes['header__profile-container']}>
			<Link to='/new-article'>Create article</Link>
			<Link className={classes['header__profile']} to={`/profile/${username}`}>
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
