import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { checkAuth } from '../../store/actions'
import Article from '../Article/Article'
import ArticleList from '../ArticleList/ArticleList'
import ErrorPage from '../ErrorPage/ErrorPage'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

const App: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()

	const initialState = async () => {
		try {
			await dispatch(
				checkAuth(JSON.parse(localStorage.getItem('user') || '{}'))
			)
			setLoading(false)
		} catch {
			localStorage.removeItem('user')
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
			errorElement: (
				<>
					<Header />
					<ErrorPage />
				</>
			),
		},
		{
			path: '/articles/',
			element: (
				<>
					<Header />
					<ArticleList />
				</>
			),
		},
		{
			path: '/articles/:slug/',
			element: (
				<>
					<Header />
					<Article />
				</>
			),
		},
		{
			path: '/sign-up',
			element: (
				<>
					<Header />
					<SignUp />
				</>
			),
		},
		{
			path: '/sign-in',
			element: (
				<>
					<Header />
					<SignIn />
				</>
			),
		},
		{
			path: '/profile',
			element: (
				<>
					<Header />
					<Profile />
				</>
			),
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
