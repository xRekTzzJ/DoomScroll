import { UnknownAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '.'
import {
	getArticle as article,
	getArticles as articles,
	getUserInfo,
	userLogin as login,
	newComment,
	registerNewUser as register,
	updateUser as update,
} from '../services/realworld-service'
import { IUserData } from '../types/types'

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

export const logOut = () => {
	localStorage.removeItem('user')
	return {
		type: 'LOG_OUT',
		payload: {},
	}
}

export const loginUser = (userdata: {
	email: string
	password: string
}): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'LOGIN',
			payload: await login(userdata),
		})
	}
}

export const updateUser = (
	userdata: IUserData,
	key: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'UPDATE_USER',
			payload: await update(userdata, key),
		})
	}
}

export const createComment = (
	slug: string,
	token: string,
	body: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		dispatch({
			type: 'CREATE_COMMENT',
			payload: await newComment(slug, token, body),
		})
	}
}

export const changeTheme = (bool: boolean) => {
	return {
		type: 'CHANGE_THEME',
		payload: bool,
	}
}
