import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../types/types'

const articleReducer = (state = {}, action: PayloadAction<IArticle>) => {
	switch (action.type) {
		case 'GET_ARTICLE':
			return {
				...action.payload,
			}
		default:
			return state
	}
}

export default articleReducer
