import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import ArticleList from '../ArticleList/ArticleList'
import ErrorPage from '../ErrorPage/ErrorPage'
import Header from '../Header/Header'

const App: React.FC = () => {
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
	])

	return <RouterProvider router={router} />
}

export default App
