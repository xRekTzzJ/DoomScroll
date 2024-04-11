import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Article from '../Article/Article'
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
		{
			path: '/articles/:slug/',
			element: (
				<>
					<Header />
					<Article />
				</>
			),
		},
	])

	return <RouterProvider router={router} />
}

export default App
