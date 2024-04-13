import { ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import avatar from '../assets/img/avatar.png'
import { useAppDispatch } from '../hooks/hooks'
import { IUserData, logOut } from '../store/actions'

interface IUserState {
	user: IUserData
}

const Header: React.FC = () => {
	const { token, username, image } = useSelector(
		(state: IUserState) => state.user
	)
	const [imageError, setImageError] = useState(false)
	const [logOutModal, setLogOutModal] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const SignButtons: React.FC = () => {
		return (
			<div className='header__button-container'>
				<Link to={'/sign-in'}>Sign In</Link>
				<Link to='/sign-up'>Sign Up</Link>
			</div>
		)
	}

	const renderImage = () => {
		if (imageError || !image) {
			return <img src={avatar} alt='Person avatar.' />
		}
		return (
			<img
				src={image}
				alt='Person avatar.'
				onError={() => setImageError(true)}
			/>
		)
	}

	const LogOutModal = () => {
		return (
			<ConfigProvider
				theme={{
					components: {
						Modal: {
							headerBg: '#2C2C54',
							contentBg: '#2C2C54',
							titleColor: '#ffffff',
							colorText: '#f0f0f0',
							borderRadiusLG: 20,
						},
					},
				}}
			>
				<Modal
					title='Log out'
					open={logOutModal}
					onOk={() => {
						setLogOutModal(false)
						dispatch(logOut())
						navigate('/')
						toast.success('You have successfully logged out!')
					}}
					onCancel={() => {
						setLogOutModal(false)
					}}
				>
					<p>Do you really want to log out?</p>
				</Modal>
			</ConfigProvider>
		)
	}

	const Profile: React.FC = () => {
		return (
			<div className='header__profile-container'>
				<Link to='/new-article'>Create article</Link>
				<Link className='header__profile' to='/profile'>
					<div>
						<span>{username}</span>
						{renderImage()}
					</div>
				</Link>

				<button
					onClick={() => {
						setLogOutModal(true)
					}}
				>
					Log Out
				</button>
			</div>
		)
	}

	return (
		<header className='header'>
			<Link to='/articles/'>DoomScroll Blog</Link>
			{token ? <Profile /> : <SignButtons />}
			{logOutModal ? <LogOutModal /> : null}
			<svg
				className='header__paint'
				width='827'
				height='1573'
				viewBox='0 0 827 1573'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_4443_6)'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M962.646 -117.886C1084.95 -85.8 1224.59 -141.543 1327.03 -55.6646C1444.09 42.4782 1557.59 190.929 1559.01 382.09C1560.41 571.81 1413.73 715.54 1334 885.616C1256.5 1050.96 1223.56 1258.9 1098.98 1363.45C969.482 1472.13 808.386 1486.33 669.766 1443.07C537.909 1401.91 456.168 1256.53 363.04 1133.77C265.912 1005.73 107.98 905.387 116.737 714.062C125.59 520.645 320.937 423.983 403.364 252.781C481.257 90.9965 452.279 -165.61 581.498 -251.251C710.784 -336.936 829.71 -152.761 962.646 -117.886Z'
						fill='#686DE0'
					/>
				</g>
				<defs>
					<clipPath id='clip0_4443_6'>
						<rect width='827' height='1573' fill='white' />
					</clipPath>
				</defs>
			</svg>
		</header>
	)
}

export default Header
