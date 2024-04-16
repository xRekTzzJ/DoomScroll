import { IUserData } from '../types/types'

const baseURL: string = 'https://blog.kata.academy/api/'

export const getArticles = async (page: number, key = '') => {
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

	const commentsResponse = await fetch(`${baseURL}articles/${slug}/comments`)
	const commentsData = await commentsResponse.json()

	if (!data.ok) {
		throw data
	}

	const response = await data.json()
	return { ...response.article, ...commentsData }
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

export const favoriteAnArticle = async (slug: string, key: string) => {
	const data = await fetch(`${baseURL}articles/${slug}/favorite`, {
		method: 'POST',
		headers: {
			Authorization: `Token ${key}`,
		},
	})
	if (!data.ok) {
		throw data
	}
	const response = await data.json()
	return response.article
}

export const unfavoriteAnArticle = async (slug: string, key: string) => {
	const data = await fetch(`${baseURL}articles/${slug}/favorite`, {
		method: 'DELETE',
		headers: {
			Authorization: `Token ${key}`,
		},
	})
	if (!data.ok) {
		throw data
	}
	const response = await data.json()
	return response.article
}

export const createArticle = async (articleData: unknown, key: string = '') => {
	const data = await fetch(`${baseURL}articles`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Token ${key}`,
		},
		body: JSON.stringify({ article: articleData }),
	})
	if (!data.ok) {
		throw data
	}
	const response = await data.json()
	return response
}

export const updateArticle = async (
	articleData: unknown,
	slug: string,
	key: string = ''
) => {
	const data = await fetch(`${baseURL}articles/${slug}`, {
		method: 'PUT',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Token ${key}`,
		},
		body: JSON.stringify({ article: articleData }),
	})
	if (!data.ok) {
		throw data
	}
	const response = await data.json()
	return response
}

export const deleteArticle = async (slug: string = '', key: string = '') => {
	const data = await fetch(`${baseURL}articles/${slug}`, {
		method: 'DELETE',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Token ${key}`,
		},
	})
	if (!data.ok) {
		throw data
	}
}

export const newComment = async (
	slug: string,
	token: string = '',
	body: string
) => {
	const response = await fetch(`${baseURL}articles/${slug}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({ comment: { body } }),
	})

	if (!response.ok) {
		throw response
	}

	const data = await response.json()

	return { ...data.comment }
}

export const deleteComment = async (
	id: string,
	token: string,
	slug: string
) => {
	const response = await fetch(`${baseURL}articles/${slug}/comments/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Token ${token}`,
		},
	})
	if (!response.ok) {
		throw response
	}
}

export const getProfile = async (username: string) => {
	const response = await fetch(`${baseURL}profiles/${username}`)

	const data = await response.json()

	return data.profile
}
