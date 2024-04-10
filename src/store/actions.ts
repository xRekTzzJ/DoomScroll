import { UnknownAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '.'
import { getArticles as articles } from '../services/realworld-service'

export const getArticles = (
	page: number = 1,
	key: string | undefined = undefined
): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'GET_ARTICLES',
			payload: await articles(page, key),
		})
	}
}
