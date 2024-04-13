import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../types/types'

const articleReducer = (state = {}, action: PayloadAction<IArticle>) => {
	switch (action.type) {
		case 'GET_ARTICLE':
			return {
				...action.payload,
			}
		case 'UPDATE_ARTICLE_FAVORITES_INFO':
			return {
				...state,
				favorited: action.payload.favorited,
				favoritesCount: action.payload.favoritesCount,
			}
		default:
			return state
	}
}

export default articleReducer
