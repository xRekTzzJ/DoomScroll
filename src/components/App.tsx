import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../core/hooks/hooks'
import { changeTheme, checkAuth } from '../core/store/actions'
import { IUserState } from '../core/types/types'
import ArticleListPage from '../pages/ArticleListPage'
import ArticlePage from '../pages/ArticlePage'
import EditArticlePage from '../pages/EditArticlePage'
import EditProfilePage from '../pages/EditProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

const App: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()
	const theme = useSelector((state: { theme: boolean }) => state.theme)

	const token = useSelector((state: IUserState) => state.user.token)

	const initialState = async () => {
		try {
			dispatch(changeTheme(localStorage.getItem('theme') === 'true'))
		} catch {
			dispatch(changeTheme())
		}
		try {
			await dispatch(
				checkAuth(JSON.parse(localStorage.getItem('user') || '{}'))
			)
		} catch {
			localStorage.removeItem('user')
		} finally {
			setLoading(false)
		}
	}

	if (theme) {
		document.body.classList.add('body_light')
	}

	if (!theme) {
		document.body.classList.remove('body_light')
	}

	useEffect(() => {
		initialState()
	}, [])

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navigate to={'/articles/'} />,
			errorElement: <NotFoundPage />,
		},
		{
			path: '/articles/',
			element: <ArticleListPage />,
		},
		{
			path: '/articles/:slug/',
			element: <ArticlePage />,
		},
		{
			path: '/sign-up',
			element: <SignUpPage />,
		},
		{
			path: '/sign-in',
			element: <SignInPage />,
		},
		{
			path: '/profile/:username/',
			element: <ProfilePage />,
		},
		{
			path: '/edit-profile',
			element: token ? <EditProfilePage /> : <Navigate to={'/articles/'} />,
		},
		{
			path: '/new-article',
			element: token ? <EditArticlePage /> : <Navigate to={'/articles/'} />,
		},
		{
			path: '/articles/:slug/edit',
			element: token ? <EditArticlePage /> : <Navigate to={'/articles/'} />,
		},
	])

	if (loading) {
		return (
			<Spin
				style={{
					margin: 'auto',
				}}
				indicator={
					<LoadingOutlined
						style={{
							width: '100%',
							fontSize: 64,
						}}
						spin
					/>
				}
			/>
		)
	}

	return <RouterProvider router={router} />
}

export default App
