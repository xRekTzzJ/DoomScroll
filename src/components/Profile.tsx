import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getProfile } from '../core/services/realworld-service'
import { IUserState } from '../core/types/types'
import classes from '../styles/profile.module.scss'
import UserImage from './UserImage'

const Profile = () => {
	const location = useLocation()

	const username = useSelector((state: IUserState) => state.user.username)

	const [userState, setUserState] = useState({
		username: '',
		image: '',
		bio: '',
	})
	const [loading, setLoading] = useState(true)

	const loadProfile = async () => {
		setLoading(true)
		const username = location.pathname.split('/').pop()
		setUserState(await getProfile(username ? username : ''))
		setLoading(false)
	}

	useEffect(() => {
		loadProfile()
	}, [])

	if (loading) {
		return (
			<div className={classes['profile']}>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
								width: '100%',
								fontSize: 48,
							}}
							spin
						/>
					}
				/>
			</div>
		)
	}

	return (
		<div className={classes['profile']}>
			<UserImage image={userState.image} />
			<span>username: {userState.username}</span>
			{userState.bio && <p>Bio: {userState.bio}</p>}
			{username === userState.username && (
				<Link to='/edit-profile'>Edit profile</Link>
			)}
		</div>
	)
}

export default Profile
