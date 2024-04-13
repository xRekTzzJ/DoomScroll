import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../types/types'

const initialState = {
	articles: [],
}

const articlesReducer = (
	state = initialState,
	action: PayloadAction<IArticle[]>
) => {
	switch (action.type) {
		case 'GET_ARTICLES':
			return {
				...action.payload,
			}
		default:
			return state
	}
}

export default articlesReducer
