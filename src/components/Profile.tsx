import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import activeLike from '../assets/img/active-like.svg'
import like from '../assets/img/like.svg'
import {
	followUser,
	getProfile,
	unfollowUser,
} from '../core/services/realworld-service'
import { IUserState } from '../core/types/types'
import classes from '../styles/profile.module.scss'
import UserImage from './UserImage'

const Profile = () => {
	const location = useLocation()

	const usernameParam = location.pathname.split('/').pop()

	const { username, token } = useSelector((state: IUserState) => state.user)

	const [userState, setUserState] = useState({
		username: '',
		image: '',
		bio: '',
		following: false,
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [likeLoading, setLikeLoading] = useState(false)

	const loadProfile = async () => {
		setLoading(true)
		try {
			setUserState(await getProfile(usernameParam ? usernameParam : '', token))
		} catch {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadProfile()
	}, [usernameParam])

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

	const likeHandler = async () => {
		setLikeLoading(true)

		try {
			if (!userState.following) {
				setUserState(
					await followUser(usernameParam ? usernameParam : '', token)
				)
			}
			if (userState.following) {
				setUserState(
					await unfollowUser(usernameParam ? usernameParam : '', token)
				)
			}
		} catch {
			toast.error('Something went wrong!')
		} finally {
			setLikeLoading(false)
		}
	}

	if (error) {
		return (
			<div className={classes['profile']}>
				<UserImage image='' />
				<span>Data error.</span>
			</div>
		)
	}

	return (
		<div className={classes['profile']}>
			<UserImage image={userState.image} />
			{username !== userState.username && token && (
				<div
					className={classes['profile__rate-container']}
					onClick={likeHandler}
				>
					{likeLoading ? (
						<Spin
							indicator={
								<LoadingOutlined
									style={{
										width: '100%',
										fontSize: 34,
										color: 'red',
									}}
									spin
								/>
							}
						/>
					) : (
						<>
							{' '}
							<img src={userState.following ? activeLike : like} alt='like' />
							<span>{userState.following ? 'unfollow' : 'follow'}</span>
						</>
					)}
				</div>
			)}
			<span>username: {userState.username}</span>
			{userState.bio && <p>Bio: {userState.bio}</p>}
			{username === userState.username && (
				<Link to='/edit-profile'>Edit profile</Link>
			)}
		</div>
	)
}

export default Profile
