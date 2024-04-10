const baseURL: string = 'https://blog.kata.academy/api/'
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

type GetArticle = (page?: number, key?: string) => any
// Promise<{
// 	articles: IArticle[]
// 	articlesCount: number
// }>

export const getArticles: GetArticle = async (page = 1, key = '') => {
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