import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ArticleList from '../ArticleList/ArticleList'
import ErrorPage from '../ErrorPage/ErrorPage'
import Header from '../Header/Header'

const App: React.FC = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <ArticleList />,
			errorElement: <ErrorPage />,
		},
	])

	return (
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	)
}

export default App
