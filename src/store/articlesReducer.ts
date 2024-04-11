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
