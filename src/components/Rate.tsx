import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import activeLike from '../assets/img/active-like.svg'
import blackLike from '../assets/img/black-like.svg'
import like from '../assets/img/like.svg'

import {
	favoriteAnArticle,
	unfavoriteAnArticle,
} from '../core/services/realworld-service'
import { IProfileUserState, RateProps } from '../core/types/types'
import classes from '../styles/rate.module.scss'

const Rate = ({ favoritesCount, favorited, slug = '' }: RateProps) => {
	const token = useSelector((state: IProfileUserState) => state.user.token)
	const [isFavorited, setIsFavorited] = useState(favorited)
	const [favortiedCount, setFavoritedCount] = useState(favoritesCount)

	const theme = useSelector((state: { theme: boolean }) => state.theme)

	const [loading, setLoading] = useState(false)

	const rateClasses = token
		? classes['rate-container']
		: `${classes['rate-container']} ${classes['rate-container_disabled']}`

	if (loading) {
		return (
			<div className={rateClasses}>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
								fontSize: 20,
							}}
							spin
						/>
					}
				/>
			</div>
		)
	}

	return (
		<div
			className={rateClasses}
			onClick={async e => {
				e.stopPropagation()

				if (!token || loading) return

				setLoading(true)
				try {
					if (isFavorited) {
						await unfavoriteAnArticle(slug, token)
						setIsFavorited(false)
						setFavoritedCount(state => state - 1)
					} else {
						await favoriteAnArticle(slug, token)
						setIsFavorited(true)
						setFavoritedCount(state => state + 1)
					}
				} catch {
					toast.error('Something went wrong!')
				} finally {
					setLoading(false)
				}
			}}
		>
			<img
				src={isFavorited ? activeLike : theme ? blackLike : like}
				alt='Like button.'
			/>
			<span>{favortiedCount}</span>
		</div>
	)
}

export default Rate
