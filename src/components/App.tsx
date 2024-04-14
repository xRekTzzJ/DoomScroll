import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { useAppDispatch } from '../core/hooks/hooks'
import { checkAuth } from '../core/store/actions'
import ArticleListPage from '../pages/ArticleListPage'
import ArticlePage from '../pages/ArticlePage'
import EditArticlePage from '../pages/EditArticlePage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

const App: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()

	const initialState = async () => {
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
			path: '/profile',
			element: <ProfilePage />,
		},
		{
			path: '/new-article',
			element: <EditArticlePage />,
		},
		{
			path: '/articles/:slug/edit',
			element: <EditArticlePage />,
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