import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IUserState } from '../core/types/types'
import classes from '../styles/header.module.scss'
import HeaderProfile from './HeaderProfile'
import LogOutModal from './LogOutModal'
import SignButtons from './SignButtons'

const Header: React.FC = () => {
	const [menuState, setMenuState] = useState(false)
	const { token, username, image } = useSelector(
		(state: IUserState) => state.user
	)

	const [logOutModal, setLogOutModal] = useState(false)

	const logOutHandler = (boolean: boolean) => {
		setLogOutModal(boolean)
	}

	return (
		<>
			<header className={classes['header']}>
				<Link to='/articles/'>DoomScroll Blog</Link>
				{token ? (
					<HeaderProfile
						image={image}
						username={username}
						logOutHandler={logOutHandler}
					/>
				) : (
					<SignButtons />
				)}
				{logOutModal ? (
					<LogOutModal active={logOutModal} logOutHandler={logOutHandler} />
				) : null}
				<svg
					className={classes['header__paint']}
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
			<header className={classes['mobile-header']}>
				<MenuFoldOutlined
					onClick={() => setMenuState(true)}
					className={classes['mobile-header__menu-button']}
					style={{
						backgroundColor: '#2c2c54',
					}}
				/>
				<div
					className={classes['mobile-header__menu']}
					style={{
						right: menuState ? 0 : -1000,
					}}
				>
					<MenuUnfoldOutlined
						onClick={() => setMenuState(false)}
						className={classes['mobile-header__menu-button']}
						style={{
							backgroundColor: '#686de0',
						}}
					/>
					<Link to='/articles/'>DoomScroll Blog</Link>
					{token ? (
						<HeaderProfile
							image={image}
							username={username}
							logOutHandler={logOutHandler}
						/>
					) : (
						<SignButtons />
					)}
				</div>
				<svg
					className={classes['mobile-header__paint']}
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
		</>
	)
}

export default Header
