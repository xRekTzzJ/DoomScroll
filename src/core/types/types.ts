export interface IAuthor {
	username: string
	bio?: string
	image?: string
	following: boolean
}

export interface IArticle {
	slug: string
	title: string
	description: string
	body: string
	tagList: string[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: IAuthor
}

export interface IArticleState {
	article: IArticle
}

export interface IUserState {
	user: IUserData
}

export interface IArticlesState {
	articles: {
		articles: IArticle[]
		page: number
		articlesCount: number
	}
}

export interface IProfileInputs {
	username: string
	email: string
	image: string
	password: string
}

export interface ISignInInputs {
	email: string
	password: string
}

export interface ISignUpInputs {
	username: string
	email: string
	password: string
	repeatPassword: string
}

export interface IUserData {
	username: string
	email: string
	token?: string | undefined
	image?: string
	password?: string
}

export interface IProfileUserState {
	user: {
		username: string
		email: string
		token: string
		image?: string
		password?: string
	}
}

export type ArticleItemProps = {
	image?: string
	username: string
	title: string
	description: string
	favoritesCount: number
	favorited: boolean
	tagList: string[]
	createdAt: string
	slug: string
}

export type RateProps = {
	favoritesCount: number
}
