import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../core/hooks/hooks'
import { getArticles } from '../core/store/actions'
import ArticleItem from './ArticleItem'

export interface IAuthor {
	username: string
	bio?: string
	image?: string
	following: boolean
}

export interface IArticle {
	slug: string
	title: string
	description: string
	body: string
	tagList: string[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: IAuthor
}

interface RootState {
	articles: {
		articles: IArticle[]
		page: number
		articlesCount: number
	}
}

const ArticleList: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()
	const { articlesCount, articles } = useSelector(
		(state: RootState) => state.articles
	)

	const params = new URLSearchParams(location.search)

	const id = params.get('page')

	const loadArticles = async () => {
		setLoading(true)
		await dispatch(getArticles(id ? Number(id) : 1))
		setLoading(false)
	}

	useEffect(() => {
		if (location.pathname === '/') {
			redirect('/article-list/')
		}

		loadArticles()
	}, [id])

	if (loading) {
		return (
			<section className='article-list-wrapper'>
				<Spin
					indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
					style={{
						margin: 'auto',
					}}
				/>
				;
			</section>
		)
	}

	return (
		<section className='article-list-wrapper'>
			<svg
				style={{
					position: 'absolute',
					zIndex: '-2',
					left: '0',
					top: '30%',
				}}
				width='511'
				height='1472'
				viewBox='0 0 511 1472'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_4443_4)'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M-219.457 1328.45C-327.987 1309.2 -445.119 1360.89 -540.347 1297.72C-649.174 1225.54 -758.603 1113.05 -773.865 960.699C-789.013 809.495 -672.226 687.284 -615.501 547.537C-560.355 411.68 -547.029 244.166 -446.558 154.344C-342.114 60.9687 -203.308 41.2964 -79.7951 68.6052C37.6926 94.5819 119.325 206.271 209.182 299.328C302.899 396.383 447.368 468.207 453.811 621.218C460.324 775.902 297.837 863.105 238.85 1003.89C183.107 1136.93 227.1 1340.04 121.211 1415.03C15.2666 1490.05 -101.494 1349.36 -219.457 1328.45Z'
						fill='#686DE0'
					/>
				</g>
				<defs>
					<clipPath id='clip0_4443_4'>
						<rect width='511' height='1472' fill='white' />
					</clipPath>
				</defs>
			</svg>
			<ul className='article-list'>
				{articles.map((i: IArticle) => {
					return (
						<ArticleItem
							key={i.slug}
							image={i.author.image}
							username={i.author.username}
							title={i.title}
							description={i.description}
							favoritesCount={i.favoritesCount}
							favorited={i.favorited}
							tagList={i.tagList}
							createdAt={i.createdAt}
							slug={i.slug}
						/>
					)
				})}
			</ul>
			<ConfigProvider
				theme={{
					components: {
						Pagination: {
							itemActiveBg: '#686DE0',
							colorPrimary: '#000000',
							colorText: '#ffffff',
							fontFamily: 'Helvetica Neue',
							fontSize: 18,
							colorPrimaryHover: '#ffffff',
						},
					},
				}}
			>
				<Pagination
					style={{
						margin: '20px 0 50px',
					}}
					current={id ? Number(id) : 1}
					total={Math.floor(articlesCount / 20) * 10}
					onChange={e => {
						navigate(`?page=${e}`)
					}}
					showSizeChanger={false}
				/>
			</ConfigProvider>
			<svg
				style={{
					position: 'absolute',
					zIndex: '-2',
					right: '0',
					bottom: '0',
					transform: 'rotate(180deg)',
				}}
				width='511'
				height='1472'
				viewBox='0 0 511 1472'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_4443_4)'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M-219.457 1328.45C-327.987 1309.2 -445.119 1360.89 -540.347 1297.72C-649.174 1225.54 -758.603 1113.05 -773.865 960.699C-789.013 809.495 -672.226 687.284 -615.501 547.537C-560.355 411.68 -547.029 244.166 -446.558 154.344C-342.114 60.9687 -203.308 41.2964 -79.7951 68.6052C37.6926 94.5819 119.325 206.271 209.182 299.328C302.899 396.383 447.368 468.207 453.811 621.218C460.324 775.902 297.837 863.105 238.85 1003.89C183.107 1136.93 227.1 1340.04 121.211 1415.03C15.2666 1490.05 -101.494 1349.36 -219.457 1328.45Z'
						fill='#686DE0'
					/>
				</g>
				<defs>
					<clipPath id='clip0_4443_4'>
						<rect width='511' height='1472' fill='white' />
					</clipPath>
				</defs>
			</svg>
		</section>
	)
}

export default ArticleList
