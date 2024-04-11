import { PayloadAction } from '@reduxjs/toolkit'

interface IAuthor {
	username: string
	bio?: string
	image?: string
	following: boolean
}

interface IArticle {
	slug: string
	title: string
	description: string
	body: string
	tags: string[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: IAuthor
}

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
