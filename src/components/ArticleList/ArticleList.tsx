import { ConfigProvider, Pagination } from 'antd'
import ArticleItem from '../ArticleItem/ArticleItem'

const ArticleList: React.FC = () => {
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
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
				<ArticleItem />
			</ul>
			<ConfigProvider
				theme={{
					components: {
						Pagination: {
							itemActiveBg: '#686DE0',
							colorPrimary: '#000000',
							colorText: '#ffffff',
						},
					},
				}}
			>
				<Pagination defaultCurrent={1} total={50} />
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
