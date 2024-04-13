import { IUserData } from '../types/types'

const baseURL: string = 'https://blog.kata.academy/api/'

type GetArticles = (page: number, key?: string) => any

export const getArticles: GetArticles = async (page, key = '') => {
	const data = await fetch(
		`${baseURL}/articles?offset=${
			page === 1 ? 0 : page === 2 ? 20 : page * 20
		}`,
		key.length
			? {
					headers: {
						Authorization: `Token ${key}`,
					},
			  }
			: {}
	)
	if (!data.ok) {
		throw data
	}

	const response = await data.json()

	return { ...response, page }
}

export const getArticle = async (slug: string, key?: string) => {
	const data = await fetch(
		`${baseURL}articles/${slug}`,
		key
			? {
					headers: {
						Authorization: `Token ${key}`,
					},
			  }
			: {}
	)

	if (!data.ok) {
		throw data
	}

	const response = await data.json()
	return response.article
}

export const registerNewUser = async (userData: IUserData) => {
	const data = await fetch(`${baseURL}users`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ user: userData }),
	})

	if (!data.ok) {
		throw data
	}

	const result = await data.json()
	localStorage.setItem('user', JSON.stringify(result.user))
	return result.user
}

export const getUserInfo = async (key: string | undefined) => {
	const data = await fetch(`${baseURL}user`, {
		method: 'GET',
		headers: {
			Authorization: `Token ${key}`,
		},
	})

	if (!data.ok) {
		throw data
	}

	const result = await data.json()
	return result.user
}

export const userLogin = async (userData: {
	email: string
	password: string
}) => {
	const data = await fetch(`${baseURL}users/login`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ user: userData }),
	})
	if (!data.ok) {
		throw data
	}
	const result = await data.json()
	localStorage.setItem('user', JSON.stringify(result.user))
	return result.user
}

export const updateUser = async (userData: IUserData, key: string) => {
	const data = await fetch(`${baseURL}user`, {
		method: 'PUT',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Token ${key}`,
		},
		body: JSON.stringify({ user: userData }),
	})
	if (!data.ok) {
		throw data
	}
	const result = await data.json()
	localStorage.setItem('user', JSON.stringify(result.user))
	return result.user
}
