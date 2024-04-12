import { UnknownAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '.'
import {
	getArticle as article,
	getArticles as articles,
	getUserInfo,
	registerNewUser as register,
} from '../services/realworld-service'

export interface IUserData {
	username: string
	email: string
	token?: string | undefined
	image?: string
	password?: string
}

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

export const getArticle = (
	slug: string,
	key = ''
): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'GET_ARTICLE',
			payload: await article(slug, key),
		})
	}
}

export const registerNewUser = (
	userdata: IUserData
): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'REGISTER_NEW_USER',
			payload: await register(userdata),
		})
	}
}

export const checkAuth = (
	userData: IUserData
):
	| ThunkAction<void, RootState, unknown, UnknownAction>
	| {
			type: string
			payload: IUserData
	  } => {
	if (Object.keys(userData).length) {
		return async dispatch => {
			const { token } = userData
			dispatch({
				type: 'AUTH',
				payload: await getUserInfo(token),
			})
		}
	}
	return {
		type: 'AUTH',
		payload: userData,
	}
}
