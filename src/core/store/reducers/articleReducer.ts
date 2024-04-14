import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../types/types'

const articleReducer = (
	state = {
		comments: [],
	},
	action: PayloadAction<IArticle>
) => {
	switch (action.type) {
		case 'GET_ARTICLE':
			return {
				...action.payload,
			}
		case 'CREATE_COMMENT':
			return {
				...state,
				comments: [action.payload, ...state.comments],
			}
		default:
			return state
	}
}

export default articleReducer
